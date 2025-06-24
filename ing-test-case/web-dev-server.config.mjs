export default {
  rootDir: '.',
  nodeResolve: true,
  watch: true,
  open: true,
  appIndex: './index.html',
  plugins: [],
  middleware: [
    function spaFallback(context, next) {
      const acceptHeader = context.headers['accept'] || '';
      if (
        context.method === 'GET' &&
        !context.url.includes('.') &&
        acceptHeader.includes('text/html')
      ) {
        context.url = '/index.html';
      }
      return next();
    }
  ]
};
