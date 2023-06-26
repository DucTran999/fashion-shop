const delay = (timeDelay) => {
  return new Promise((resolve) => setTimeout(resolve, timeDelay));
};

export default delay;
