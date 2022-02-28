import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { YoutubeProvider } from '../src/contexts/YoutubeContext';
import Youtube from '../src/YoutubeView';

// @ts-ignore
global.window = Object.create(window);
const url = 'http://dummy.com';
Object.defineProperty(window, 'location', {
  value: {
    href: url,
  },
  writable: true,
});

Object.defineProperty(window, 'open', {
  value: () => {},
  writable: true,
});

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  return result as renderer.ReactTestRendererJSON;
}

describe('SpotifyView tests', () => {
  it('Renders without crash', () => {
    const component = renderer.create(
      <BrowserRouter>
        <YoutubeProvider>
          <Youtube />
        </YoutubeProvider>
      </BrowserRouter>,
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
