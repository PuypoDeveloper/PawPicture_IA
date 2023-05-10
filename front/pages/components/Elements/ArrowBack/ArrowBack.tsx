import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "./stylesArrowBack.module.css"

export default function ArrowBack() {
  return (
    <>
        <div className={styles.ArrowBack}>
            <ArrowBackIcon/>
        </div>
    </>
  )
}
