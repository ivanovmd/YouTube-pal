import React, { useState, useEffect } from 'react';
import { getDirectoryPickerApi, removeSelectDirectoryListener } from '../infrastructure/fielSystem/getDownloadPath';




export const DirectoryPicker = () => {
  const [selectedDirectory, setSelectedDirectory] = useState('');

  useEffect(() => {
    getDirectoryPickerApi().onDirectorySelected((event: any, path: string) => {
      setSelectedDirectory(path);
    });

    return () => {
      removeSelectDirectoryListener()
    };
  }, []);

  const handleSelectDirectory = () => {
    // Invoke the selectDirectory method exposed via preload script
    getDirectoryPickerApi().selectDirectory().then((path: string) => {
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