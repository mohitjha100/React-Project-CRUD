import React from 'react'
import "../Style/Input.css"

const Input = ({placeholder,inputData,name,type,required,password}) => {
  return (
    <>
    <input placeholder={placeholder} name= {name} onChange={(e)=>{inputData(e)}} type={type} required={required} password={password}/>
    </>
  )
}

export default Input
