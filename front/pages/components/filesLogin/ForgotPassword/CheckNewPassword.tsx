import React from 'react'
import styles from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"

interface Props { 
  isOpen: boolean,
  CloseModal: (()=>void)
}

export default function CheckNewPassword({isOpen, CloseModal}:Props) {
  const stopPropagation = (e:React.MouseEvent<HTMLElement>) => { 
    e.stopPropagation()
  }
  return (
    <main className={`${isOpen ? stylesTwo.OpenModal : stylesTwo.CloseModal}`} onClick={CloseModal}>
        <section className={styles.ctnFormLogin} onClick={stopPropagation}>
            <img src="" alt="" />
            <p>Password changed successfully</p>
            <button onClick={CloseModal}>Okey</button>
        </section>
    </main>
  )
}
