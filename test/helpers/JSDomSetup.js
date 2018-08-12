const { JSDOM } = require('jsdom');
const { fetch } = require('whatwg-fetch');

const setupCustomWindow = window => {};

const setupDom = (customOptions = {}) => {
  // Need an empty script tag for some loaders
  const dom = new JSDOM(``, {
    url: 'http://localhost',
    ...customOptions
  });
  const { window } = dom;
  setupCustomWindow(window);
  global.dom = dom;
  // Remapping some of the window fields to be global
  global.window = window;
  global.XMLHttpRequest = window.XMLHttpRequest;
  global.document = window.document;
  global.navigator = window.navigator;
  global.Image = window.Image;
  global.HTMLElement = window.HTMLElement; // Temp hack due to chai and type detect
  global.requestAnimationFrame = cb => setTimeout(cb, 0);
  global.cancelAnimationFrame = cb => setTimeout(cb, 0);
  // Setting up fetch as a global
  global.fetch = fetch;
};

module.exports = { setupDom };
