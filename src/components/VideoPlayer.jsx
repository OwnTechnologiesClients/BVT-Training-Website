"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Settings, SkipForward, SkipBack, AlertCircle } from "lucide-react";
import { refreshVideoUrl } from "@/lib/api/lessonContent";

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
};

// Helper function to extract Vimeo video ID from URL
const getVimeoVideoId = (url) => {
  if (!url) return null;
  
  // Handle various Vimeo URL formats
  const patterns = [
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/,
    /vimeo\.com\/channels\/[^\/]+\/(\d+)/,
    /vimeo\.com\/groups\/[^\/]+\/videos\/(\d+)/,
    /vimeo\.com\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Helper function to get Vimeo embed URL
const getVimeoEmbedUrl = (url) => {
  const videoId = getVimeoVideoId(url);
  if (!videoId) return null;
  return `https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`;
};

const VideoPlayer = ({ 
  videoSrc, // Can be string (file path) or object with {type, filePath/youtubeUrl}
  title = "Video Player", 
  autoplay = false,
  onVideoEnd = null,
  onVideoStart = null,
  onProgressUpdate = null, // Callback for progress tracking: (progressPercentage, currentTime, duration) => void
  contentId = null // Lesson content ID for refreshing expired pre-signed URLs
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null); // Store current video URL (for refresh)
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      if (onVideoStart) {
        onVideoStart();
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newCurrentTime = videoRef.current.currentTime;
      const newDuration = videoRef.current.duration;
      setCurrentTime(newCurrentTime);
      
      // Call progress update callback if provided
      if (onProgressUpdate && newDuration > 0) {
        const progressPercentage = (newCurrentTime / newDuration) * 100;
        onProgressUpdate(progressPercentage, newCurrentTime, newDuration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  // Handle video URL refresh for expired pre-signed URLs
  const handleVideoError = async (event) => {
    // Get the video element and its error
    const video = videoRef.current;
    if (!video) return;
    
    const videoError = video.error;
    
    // Only log if there's actual error information from the video element
    if (videoError) {
      const errorInfo = {
        code: videoError.code,
        message: videoError.message,
        networkState: video.networkState
      };
      
      // Handle different error types
      // Code 4 = MEDIA_ELEMENT_ERROR (format error, corrupted file, etc.)
      // Code 2 = NETWORK_ERROR (network issues, 403/404, etc.)
      // Code 3 = DECODE_ERROR (decoding issues)
      
      // Only attempt URL refresh for network errors (code 2) or when networkState is 3
      // Format errors (code 4) won't be fixed by refreshing the URL
      const isNetworkError = videoError.code === 2 || video.networkState === 3;
      const isExpiredUrl = video.networkState === 3 && contentId;
      
      if (isExpiredUrl && contentId) {
        try {
          const response = await refreshVideoUrl(contentId);
          if (response.success && response.data?.videoUrl) {
            setVideoUrl(response.data.videoUrl);
            video.src = response.data.videoUrl;
            video.load();
            setIsLoading(true);
          }
        } catch (refreshError) {
          // Error refreshing video URL
        }
      } else if (videoError.code === 4) {
        // Format error - video format not supported or corrupted
      }
    }
  };

  // Reload video when videoSrc changes
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      
      // Extract video URL from videoSrc
      const videoData = typeof videoSrc === 'object' && videoSrc !== null ? videoSrc : { type: 'upload', filePath: videoSrc };
      const isYouTube = videoData.type === 'youtube' || (videoData.youtubeUrl && getYouTubeVideoId(videoData.youtubeUrl));
      const isVimeo = videoData.type === 'vimeo' || (videoData.vimeoUrl && getVimeoVideoId(videoData.vimeoUrl));
      const newVideoUrl = (isYouTube || isVimeo) ? null : (videoData.filePath || (typeof videoSrc === 'string' ? videoSrc : null));
      
      if (newVideoUrl) {
        setVideoUrl(newVideoUrl);
      }
      
      // Reset video to beginning
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [videoSrc]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleClickOutside = (event) => {
      if (showSettings && !event.target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSettings]);

  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (event) => {
    if (videoRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const pos = (event.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine video type and source
  const videoData = typeof videoSrc === 'object' && videoSrc !== null ? videoSrc : { type: 'upload', filePath: videoSrc };
  
  // Check if it's a YouTube video
  const hasYouTubeType = videoData.type === 'youtube';
  const hasYouTubeUrl = videoData.youtubeUrl && typeof videoData.youtubeUrl === 'string';
  const isYouTube = hasYouTubeType || (hasYouTubeUrl && getYouTubeVideoId(videoData.youtubeUrl));
  
  // Check if it's a Vimeo video
  const hasVimeoType = videoData.type === 'vimeo';
  const hasVimeoUrl = videoData.vimeoUrl && typeof videoData.vimeoUrl === 'string';
  const isVimeo = hasVimeoType || (hasVimeoUrl && getVimeoVideoId(videoData.vimeoUrl));
  
  // Get the actual video source or embed URL
  // Use videoUrl state if available (refreshed URL), otherwise use original
  const actualVideoSrc = (isYouTube || isVimeo) ? null : (videoUrl || videoData.filePath || (typeof videoSrc === 'string' ? videoSrc : null));
  const youtubeEmbedUrl = isYouTube ? getYouTubeEmbedUrl(videoData.youtubeUrl) : null;
  const vimeoEmbedUrl = isVimeo ? getVimeoEmbedUrl(videoData.vimeoUrl) : null;


  // Early return for YouTube videos - render simple iframe without custom player
  if (isYouTube && youtubeEmbedUrl) {
    return (
      <div className="relative w-full h-full bg-black">
        {/* Video Title Overlay */}
        <div className="absolute top-4 left-4 z-20">
          <h3 className="text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
            {title}
          </h3>
        </div>
        <iframe
          src={youtubeEmbedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  // Early return for Vimeo videos - render simple iframe without custom player
  if (isVimeo && vimeoEmbedUrl) {
    return (
      <div className="relative w-full h-full bg-black">
        {/* Video Title Overlay */}
        <div className="absolute top-4 left-4 z-20">
          <h3 className="text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
            {title}
          </h3>
        </div>
        <iframe
          src={vimeoEmbedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  if (!videoSrc && !youtubeEmbedUrl && !vimeoEmbedUrl) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No video selected</p>
          <p className="text-sm text-gray-400 mt-2">Select a lesson from the sidebar to start watching</p>
        </div>
      </div>
    );
  }

  // Check if video source is missing (for uploaded videos)
  if (!isYouTube && !isVimeo && !actualVideoSrc) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-yellow-500" />
          <p className="text-lg">Video not available</p>
          <p className="text-sm text-gray-400 mt-2">
            {videoData.filePath ? 'Video URL is invalid or expired. Please refresh the page.' : 'No video file found for this lesson.'}
          </p>
          {contentId && (
            <button
              onClick={async () => {
                try {
                  const response = await refreshVideoUrl(contentId);
                  if (response.success && response.data?.videoUrl) {
                    setVideoUrl(response.data.videoUrl);
                  }
                } catch (err) {
                  // Error refreshing video
                }
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Video URL
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading video...</p>
          </div>
        </div>
      )}

      {/* Video Element for uploaded videos */}
      <video
        ref={videoRef}
        src={actualVideoSrc}
        className="w-full h-full object-contain cursor-pointer"
        autoPlay={autoplay}
        muted={isMuted}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleVideoError}
        onClick={handleVideoClick}
        controls={false}
        playsInline
        key={actualVideoSrc} // Force reload when videoSrc changes
      />

      {/* Video Title Overlay */}
      <div className="absolute top-4 left-4 z-20">
        <h3 className="text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
          {title}
        </h3>
      </div>

      {/* Custom Controls - Only show for uploaded videos, not YouTube or Vimeo */}
      {!isYouTube && !isVimeo && (
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Skip Back */}
            <button
              onClick={() => skipTime(-10)}
              className="text-white hover:text-blue-400 transition-colors"
              title="Skip back 10s"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skipTime(10)}
              className="text-white hover:text-blue-400 transition-colors"
              title="Skip forward 10s"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-400 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 w-20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings Dropdown */}
            <div className="relative settings-dropdown">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-blue-400 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <div className="absolute bottom-8 right-0 bg-black bg-opacity-90 rounded-lg p-3 min-w-32 z-50">
                  <div className="text-white text-xs mb-2">Playback Speed</div>
                  <div className="space-y-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackRate(speed)}
                        className={`block w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-700 ${
                          playbackRate === speed ? 'text-blue-400' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                  setCurrentTime(0);
                  setIsPlaying(false);
                }
              }}
              className="text-white hover:text-blue-400 transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default VideoPlayer;
