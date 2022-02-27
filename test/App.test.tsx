import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../src/App";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  return result as renderer.ReactTestRendererJSON;
}

describe("App tests", () => {
  it("Renders without crash", () => {
    const component = renderer.create(
      <BrowserRouter>
        <App />,
      </BrowserRouter>
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
