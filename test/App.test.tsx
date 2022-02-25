import React from 'react'
import renderer from 'react-test-renderer'
import App from '../src/App'

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as renderer.ReactTestRendererJSON
}

test('Renders without crash', () => {
  const component = renderer.create(
    <App />,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
