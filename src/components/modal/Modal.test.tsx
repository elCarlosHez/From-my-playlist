import { create } from "react-test-renderer";
import { Modal } from "./";

describe('<Modal /> Tests', () => {
  it("Render the Header component.", () => {
    const component = create(
      <Modal onClose={() => {}}>
        <p>Hello Testers!</p>
      </Modal>
    );
    const json = component.toJSON();
    expect(json).toBeDefined();
    expect(json).toMatchSnapshot();
  });
});

