import React from 'react'
import { useColor } from '../contextProvider'

function ComponentA() {
    const {colorToggler}= useColor()
  return (
    <div>
        <h1>component A</h1>
        <button onClick={colorToggler}>color toggler</button>
        <hr/>
    </div>
  )
}

export default ComponentA