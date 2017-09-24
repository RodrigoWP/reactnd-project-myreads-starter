import React, { PureComponent } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Books from './containers/books'

import './css/app.css'

class App extends PureComponent {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Books}/>
        </Switch>
      </Router>
    )
  }
}

export default App
