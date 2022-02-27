import React from "react";
import renderer from "react-test-renderer";
import SpotifyView from "../src/SpotifyView";
import { SpotifyProvider } from "../src/contexts/SpotifyContext";
import { BrowserRouter } from "react-router-dom";

// @ts-ignore
global.window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, "location", {
    value: {
       href: url
    },
    writable: true
});

Object.defineProperty(window, "open", {
  value: () => {},
  writable: true
});

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  return result as renderer.ReactTestRendererJSON;
}

describe("SpotifyView tests", () => {
  it("Renders without crash", () => {
    const component = renderer.create(
      <BrowserRouter>
        <SpotifyProvider>
          <SpotifyView />
        </SpotifyProvider>
      </BrowserRouter>
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
