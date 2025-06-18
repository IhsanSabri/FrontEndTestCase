module.exports = {
  files: 'src/**/*.test.js',
  nodeResolve: true,
  testFramework: {
    name: '@web/test-runner-mocha',
    config: {
      ui: 'bdd'
    }
  },
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    }
  },
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
}; 