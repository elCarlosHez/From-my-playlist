import renderer from "react-test-renderer";
import { AppProvider } from "../../contexts/AppContext";

import { NextPage } from "./";


describe("NextPage tests", () => {
  it("Renders without crash", () => {
    const component = renderer.create(
      <AppProvider>
        <NextPage />
      </AppProvider>
    );
    const json = component.toJSON();
    expect(json).toBeDefined();
    expect(json).toMatchSnapshot();
  });
});
