/**
 * Convert image path to full URL
 * Handles both relative paths and full URLs
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop';
  }
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a data URL (base64), return as is
  if (imagePath.startsWith('data:image')) {
    return imagePath;
  }
  
  // If relative path, convert to backend URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${backendUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

