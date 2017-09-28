import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, updateShelfBook }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`}} />
      <div className="book-shelf-changer">
        <select value={book.shelf || "none"} onChange={(e) => updateShelfBook(book , e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.subtitle}</div>
  </div>
)

Book.propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  }).isRequired,
  updateShelfBook: PropTypes.func.isRequired
}

export default Book
