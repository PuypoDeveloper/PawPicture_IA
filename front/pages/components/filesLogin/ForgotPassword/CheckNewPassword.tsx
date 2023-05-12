import React from 'react'
import styles from "../Login/logIng.module.css"
import stylesThree from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import BtnHome from '../../Elements/Buttons/BtnHome'

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
      <div className={styles.ctnModal2}>
        <section className={`${styles.ctnSection} ${stylesThree.ctnSection4}`}  onClick={stopPropagation}>
            <img src="./img/iconos/check.png" alt="" />
            <p>Password changed successfully</p>
            <div onClick={CloseModal} className={stylesThree.ctnBtn3}><BtnHome text={"Okey"} color={true}/></div>
        </section>
      </div>
    </main>
  )
}
