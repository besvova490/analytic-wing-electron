function downloadProgress(callback, finallyCallback) {
  let counter = 0;
  const interval = 5000;
  const steps = 100;
  
  const increment = steps / (interval / 100);
  
  const timerId = setInterval(() => {
    counter += increment;

    if (counter % 100) {
      callback(counter / 100);
    }

    if (counter >= 100) {
      clearInterval(timerId);
      counter = 100;

      finallyCallback();
    }
  }, 100);
  
}

export default downloadProgress;
