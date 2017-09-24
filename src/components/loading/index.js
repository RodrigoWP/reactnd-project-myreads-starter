import React from 'react'

import loader from './../../icons/loader.gif'

import './loading.css'

const Loading = ({ show }) => (
 show ? (
   <div className="loading">
     <img src={loader}/>
   </div>
 ) : false
)

export default Loading
