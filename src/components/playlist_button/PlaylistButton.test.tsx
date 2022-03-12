import { create } from 'react-test-renderer';
import { Playlist } from '../../types/Playlist';
import { User } from '../../types/User';

import { PlaylistButton } from './';

const playlist: Playlist = {
  id: '1',
  name: 'test',
  image: 'https://dummy.image',
  href: '#',
  author: {
    id: '1',
    name: 'name',
  } as User,
};

describe('<PlaylistButton /> Tests', () => {
  it('Render the button with playlist been null', () => {
    const component = create(<PlaylistButton playlist={null} onClick={() => {}} />);
    expect(component.toJSON()).toBeNull();
  });

  it('Render the button with a playlist prop', () => {
    const component = create(<PlaylistButton playlist={playlist} onClick={() => {}} />);
    const json = component.toJSON();
    expect(json).toBeDefined();
    expect(json).toMatchSnapshot();
  });
});
