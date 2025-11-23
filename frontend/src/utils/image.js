export const optimizeImage = (url, width = 500) => {
  if (!url) return '';
  // Check if it's actually a Cloudinary URL
  if (!url.includes('cloudinary.com')) return url;

  // Split the URL at the '/upload/' segment
  // Old: .../upload/v1234/cat.jpg
  // New: .../upload/w_500,f_auto,q_auto/v1234/cat.jpg
  const parts = url.split('/upload/');
  return `${parts[0]}/upload/w_${width},f_auto,q_auto/${parts[1]}`;
};