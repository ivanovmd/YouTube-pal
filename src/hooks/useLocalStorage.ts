// useLocalStorage.js
import { useState, useEffect } from 'react';
import localStorageProxy from '../services/localStorageService';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => localStorageProxy.getItem(key) || initialValue);

  useEffect(() => {
    const handleCustomEvent = (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.newValue);
      }
    };

    window.addEventListener('localStorageChange', handleCustomEvent);

    return () => {
      window.removeEventListener('localStorageChange', handleCustomEvent);
    };
  }, [key]);

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorageProxy.setItem(key, newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
