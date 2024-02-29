// localStorageProxy.js
const localStorageProxy = (() => {
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: {
        key,
        newValue: value
      }
    }));
  };

  const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
    // Dispatch a custom event to notify other components about the removal
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: {
        key,
        newValue: null
      }
    }));
  };

  const clear = () => {
    localStorage.clear();
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: {
        key: null,
        newValue: null
      }
    }));
  };

  // You can add more methods here if needed

  return {
    setItem,
    getItem,
    removeItem,
    clear
  };
})();

export default localStorageProxy;
