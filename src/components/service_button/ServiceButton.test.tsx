import React from "react";
import { create } from "react-test-renderer";
import { ServicesList } from "../../types/ServicesList";
import { ServiceButton } from "./";

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const button = create(
      <ServiceButton service={ServicesList.Spotify} onPress={() => {}} />
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
