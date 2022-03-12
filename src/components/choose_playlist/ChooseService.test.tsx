import { create } from "react-test-renderer";
import { AppProvider } from "../../contexts/AppContext";
import { ChoosePlaylist } from "./";

describe("<ChoosePlaylist /> tests", () => {
  test("Render the component wihout crash", () => {
    const component = create(
      <AppProvider>
        <ChoosePlaylist />
      </AppProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
