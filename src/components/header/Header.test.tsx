import { create } from "react-test-renderer";
import { Header } from "./";

describe('<Header /> tests', () => {
  it('Render the Header component.', () => {
    const component = create(<Header />);
    const json = component.toJSON();
    expect(json).toBeDefined();
    expect(json).toMatchSnapshot();
  });
});

