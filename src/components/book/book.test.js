import React from 'react'
import { shallow, mount } from 'enzyme'

import Book, { bookImage } from './index'

const book = {
  imageLinks: {
    thumbnail: ''
  },
  title: '',
  subtitle: ''
}

it('Renderiza sem erros', () => {
  const bookComponent = (
    <Book
      book={book}
      updateShelfBook={() => {}}
    />
  )

  expect(shallow(bookComponent)).toMatchSnapshot()
})

it('Ao chamar bookImage e a imagem for null o caminho deve retornar /no-image-found', () => {
  const imagePath = bookImage(null)

  const imageNotFoundPath = '/no-image-found.jpg'

  expect(imagePath).toBe(imageNotFoundPath)
})

it('Deve chamar updateShelfBook ao dar change no select', () => {
  const updateShelfBook = jest.fn()

  const bookComponent = mount(
    <Book
      book={book}
      updateShelfBook={updateShelfBook}
    />
  )

  bookComponent.find("select").simulate('change')
  expect(updateShelfBook).toHaveBeenCalledTimes(1)
})
