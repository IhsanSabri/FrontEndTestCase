// Add process polyfill for Redux
window.process = {
  env: {
    NODE_ENV: 'test'
  }
}; 