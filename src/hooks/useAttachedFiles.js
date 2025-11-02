import { useState, useCallback } from 'react';

export const useAttachedFiles = () => {
  const [attachedFiles, setAttachedFiles] = useState([]);

  const addFile = useCallback((file) => {
    const newFile = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    };
    setAttachedFiles(prev => [...prev, newFile]);
  }, []);

  const removeFile = useCallback((id) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearAllFiles = useCallback(() => {
    setAttachedFiles([]);
  }, []);

  return {
    attachedFiles,
    addFile,
    removeFile,
    clearAllFiles
  };
};