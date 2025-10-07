"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Settings, SkipForward, SkipBack } from "lucide-react";

const VideoPlayer = ({ 
  videoSrc, 
  title = "Video Player", 
  autoplay = false,
  onVideoEnd = null,
  onVideoStart = null
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
      setCurrentTime(videoRef.current.currentTime);
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

  // Reload video when videoSrc changes
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
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

  if (!videoSrc) {
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

      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain cursor-pointer"
        autoPlay={autoplay}
        muted={isMuted}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handleVideoClick}
        controls={false}
        playsInline
        key={videoSrc} // Force reload when videoSrc changes
      />

      {/* Video Title Overlay */}
      <div className="absolute top-4 left-4 z-20">
        <h3 className="text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
          {title}
        </h3>
      </div>

      {/* Custom Controls */}
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
    </div>
  );
};

export default VideoPlayer;
