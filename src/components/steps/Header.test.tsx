import { create } from "react-test-renderer";
import { Steps } from "./";

describe("Header tests", () => {
  it('Render the steps component with the last item not been active.', () => {
    const component = create(<Steps activeStep={3} />);
    const json = component.toJSON();
    expect(json).toBeDefined();
    // @ts-ignore
    expect(json.children[3].props.className).toBe('')
  });
});
