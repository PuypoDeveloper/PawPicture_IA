import React, { useContext, useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Hause from './components/Hause/Hause'
import StateCompo from './context/StateCompo'
import { counterCountext } from './context/counterContext'



export default function App() {


  return (
    <>
    <StateCompo>
      <Header userIn = {false}/>
      <Hause/>
    </StateCompo>
    </>
  )
}
