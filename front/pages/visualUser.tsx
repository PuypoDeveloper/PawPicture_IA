import React from 'react'
import Header from './components/Header/Header'
import VisualUserC from './components/visualUser/visualUser'

export default function VisualUser() {
  return (
    <>
        <Header userIn={true}/>
        <VisualUserC/> 
    </>
  )
}
