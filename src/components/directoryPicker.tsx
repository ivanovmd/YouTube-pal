import React, { useState } from 'react';
import { getDirectoryPickerApi } from '../infrastructure/fielSystem/getDownloadPath';
import { SELECT_DIRECTORY } from '../infrastructure/fielSystem/constants';


export const DirectoryPicker = () => {
  const [selectedDirectory, setSelectedDirectory] = useState('');

  const handleSelectDirectory = async () => {
    // Invoke the selectDirectory method exposed via preload script
    const path = await getDirectoryPickerApi()[SELECT_DIRECTORY]()
    if (path) {
      setSelectedDirectory(path);
    }
  };

  return (
    <div>
      <button onClick={() => handleSelectDirectory()}>Select Directory</button>
      {selectedDirectory && <p>Selected Directory: {selectedDirectory}</p>}
    </div>
  );
};