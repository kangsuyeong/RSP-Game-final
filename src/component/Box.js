import React from 'react'

const Box = (props) => {
  console.log("props",props)
  let result
  if(props.title==="COMPUTER" && props.result!=="tie" && props.result!=="GAME START"){
    result = props.result==="win"?"lose":"win"
  }
  else{
    result=props.result
  }
  return (
      <div className={`box ${result}`}>
        <h1>{props.title}</h1>
        <img className="img-size" src={props.item?.img}/>
        <h1 className={`${result}Color`}>{result}</h1>
      </div>
  )
}

export default Box
