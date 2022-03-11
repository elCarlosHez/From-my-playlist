import React from "react";

import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { Home } from "../src/Home";

// @ts-ignore
function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  return result as renderer.ReactTestRendererJSON;
}

describe("App tests", () => {
  it("Renders without crash", () => {
    const component = renderer.create(
      <BrowserRouter>
        <Home />,
      </BrowserRouter>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
