import { create } from "react-test-renderer";
import { AppProvider } from "../../contexts/AppContext";
import { Playlist } from "../../types/Playlist";
import { User } from "../../types/User";
import { ChoosePlaylist } from "./";

const playlists: Playlist[] = [{
  id: '1',
  name: 'test',
  image: 'https://dummy.image',
  href: '#',
  author: {
    id: '1',
    name: 'name',
  } as User,
}];

describe("<ChoosePlaylist /> tests", () => {
  test("Render the component wihout crash", () => {
    const component = create(
      <AppProvider>
        <ChoosePlaylist playlists={playlists} />
      </AppProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
