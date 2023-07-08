const delay = (timeDelay) => {
  return new Promise((resolve) => setTimeout(resolve, timeDelay));
};

const debounce = (fn, delay) => {
  delay = delay || 0;
  let timerId;

  return () => {
    // reset timer
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    timerId = setTimeout(() => {
      fn();
    }, delay);
  };
};

export { delay, debounce };
