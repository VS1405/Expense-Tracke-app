import { useState } from "react"

const Greeting = () => {

    const [change, setChange]= useState(false)

const changedHandler = ()=>{
setChange(true)
}
  return (
    <div>
      <h2>Hello World!</h2>
     {!change && <p>Nice to See You</p>}
     {change && <p>changed !!!</p>}
      <button onClick={changedHandler}>Changed</button>
    </div>
  )
}

export default Greeting
