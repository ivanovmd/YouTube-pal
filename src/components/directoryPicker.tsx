import React, { useState, useEffect } from 'react';

export const DirectoryPicker = () => {
  const [selectedDirectory, setSelectedDirectory] = useState('');

  useEffect(() => {
    window.electron.onDirectorySelected((event: any, path: string) => {
      setSelectedDirectory(path);
    });

    return () => {
      window.electron.removeAllListeners('selected-directory');
    };
  }, []);

  const handleSelectDirectory = () => {
    // Invoke the selectDirectory method exposed via preload script
    window.electron.selectDirectory().then((path: string) => {
      if (path) {
        setSelectedDirectory(path);
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleSelectDirectory()}>Select Directory</button>
      {selectedDirectory && <p>Selected Directory: {selectedDirectory}</p>}
    </div>
  );
};