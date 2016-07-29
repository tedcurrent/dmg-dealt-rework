import { jsdom } from "jsdom";

const exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((prop) => {
	if (!global.hasOwnProperty(prop)) {
		exposedProperties.push(prop);
		global[prop] = document.defaultView[prop];
	}
});

global.navigator = {
	userAgent: "node.js"
};