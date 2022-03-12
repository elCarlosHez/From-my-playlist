import { create } from "react-test-renderer";
import { AppProvider } from "../../contexts/AppContext";
import { ChooseService } from "./";

describe("<ChooseService /> tests", () => {
  test("Render the component wihout crash", () => {
    const component = create(
      <AppProvider>
        <ChooseService />
      </AppProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
