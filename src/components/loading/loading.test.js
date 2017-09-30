import React from 'react'
import { shallow, mount } from 'enzyme'

import Loading from './index'

it('Renderiza sem erros', () => {
  const loadingComponent = (
    <Loading />
  )

  expect(shallow(loadingComponent)).toMatchSnapshot()
})

it('Quando "show" for true deve renderizar o loading', () => {
  const loadingComponent = mount(
    <Loading show={true} />
  )

  expect(loadingComponent.find('.loading').length).toBe(1)
})

it('Quando "show" for false deve não deve renderizar o loading', () => {
  const loadingComponent = mount(
    <Loading show={false} />
  )

  expect(loadingComponent.find('.loading').length).toBe(0)
})
