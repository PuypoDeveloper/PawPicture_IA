import React from 'react'
import styles from "./stylesBtnHome.module.css"

interface Props { 
  text: String
  color: boolean
}

export default function BtnHome({text, color}: Props) {
  return (
    <>
        <button className={ color ? styles.btnHomePink : styles.btnHomeBlu}>
            {text}
        </button>
    </>
  )
}
