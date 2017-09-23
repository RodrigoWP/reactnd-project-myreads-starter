import React, { Component } from 'react'

import { getAll } from './BooksAPI'

import { Search, ListBooks } from './components'

import './App.css'

const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'

class BooksApp extends Component {
  constructor(){
      super()

      this.state = {
        showSearchPage: false,
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
  }

  componentDidMount(){
    this.loadBooks()
  }

  loadBooks = () => {
    getAll().then((data) => {
      this.setState({
        currentlyReading: data.filter(book => book.shelf === CURRENTLY_READING),
        wantToRead: data.filter(book => book.shelf === WANT_TO_READ),
        read: data.filter(book => book.shelf === READ)
      })
    })
  }

  closeSearch = () => {
      this.setState({ showSearchPage: false })
  }

  render() {
    const { showSearchPage } = this.state

    return (
      <div className="app">
        {showSearchPage ? (
            <Search handleClose={this.closeSearch} />
        ) : (
            <ListBooks {...this.state} />
        )}
      </div>
    )
  }
}

export default BooksApp
