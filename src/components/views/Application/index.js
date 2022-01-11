import React from 'react'
import './style.css'
import { AccountIcon } from '../../commons/Icons'

const Application = () => {
  return (
    <div className="application-container">
      <div className="application-flex"><AccountIcon /> <span className="application-title  ">Applications</span></div>
    </div>
  )
}

export default Application