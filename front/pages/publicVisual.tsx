import React from 'react'
import Header from './components/Header/Header'
import VisualUserC from './components/visualUser/visualUser'
import VisualPublic from './components/visualPublic/visualPublic'

export default function publicVisual() {
  return (
    <>
        <Header userIn={true}/>
        <VisualPublic/> 
    </>
  )
}
