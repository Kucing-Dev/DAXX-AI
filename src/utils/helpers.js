export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export const maskApiKey = (key) => {
  if (!key || key.length <= 8) return key;
  return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
};

export const getFileIcon = (type) => {
  if (!type) return 'file';
  
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type.includes('pdf') || type.includes('document')) return 'document';
  if (type.includes('code') || type.includes('text')) return 'code';
  return 'file';
};

export const generateChatTitle = (message, maxLength = 30) => {
  if (!message) return 'New Chat';
  return message.slice(0, maxLength) + (message.length > maxLength ? '...' : '');
};