import React from 'react'
import Header from './components/Header/Header'
import VisualUserC from './components/visualUser/visualUser'
import StateCompo from './context/StateCompo'

export default function VisualUser() {
  return (
    <>
      <StateCompo>
        <Header userIn={true}/>
        <VisualUserC/> 
      </StateCompo>
    </>
  )
}
