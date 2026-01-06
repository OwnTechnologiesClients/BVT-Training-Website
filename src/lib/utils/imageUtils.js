/**
 * Convert image path to full URL
 * Handles both S3 URLs (full URLs) and local file paths
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return null;
  }

  // If already a full URL (S3 or other), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a data URL (base64), return as is
  if (imagePath.startsWith('data:image')) {
    return imagePath;
  }

  // If it's an S3 key (starts with images/, videos/, documents/, etc.)
  // This shouldn't happen if backend is working correctly, but handle it anyway
  if (imagePath.startsWith('images/') || 
      imagePath.startsWith('videos/') || 
      imagePath.startsWith('documents/') ||
      imagePath.startsWith('uploads/') ||
      imagePath.startsWith('others/')) {
    // Backend should have converted this to full URL, but if not, construct it
    const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
    const region = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';
    const cloudFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
    
    if (bucketName) {
      if (cloudFrontUrl) {
        return `${cloudFrontUrl}/${imagePath}`;
      } else {
        return `https://${bucketName}.s3.${region}.amazonaws.com/${imagePath}`;
      }
    }
  }

  // Otherwise, it's a local file path - convert to backend URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:9000';
  return `${backendUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

