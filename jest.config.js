// jest.config.js
module.exports = {
  transformIgnorePatterns: [
    // Remove axios and canvasJs
    "node_modules/(?!axios)/", // add axios to the list of modules to be transformed
    
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // use babel-jest for transforming files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mock out CSS imports
  },
};