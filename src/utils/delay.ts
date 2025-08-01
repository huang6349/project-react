const delay = (timeout?: number) => new Promise(resolve => (
  setTimeout(resolve, timeout || 1000)
));

export default delay;
