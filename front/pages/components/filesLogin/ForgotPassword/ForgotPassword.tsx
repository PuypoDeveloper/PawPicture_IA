import React from 'react'
import styles from "../Login/logIng.module.css"
import stylesThree from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BtnHome from '../../Elements/Buttons/BtnHome';
import ArrowBack from '../../Elements/ArrowBack/ArrowBack';



interface Props { 
  isOpen: boolean,
  CloseModal: (()=>void),
  OpenLogIn:(()=>void),
  OpenEnterCode: (()=>void)
}

export default function ForgotPassword({isOpen, CloseModal, OpenLogIn, OpenEnterCode}:Props) {
  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => { 
    e.stopPropagation()
  }
  return (
    <main className={`${isOpen ? stylesTwo.OpenModal: stylesTwo.CloseModal}`} onClick={CloseModal}>
      <div className={styles.ctnModal2}>
        <section className={`${styles.ctnSection} ${stylesThree.ctnSection2}`} onClick={stopPropagation}>
          <div onClick={()=>{ 
            CloseModal()
            OpenLogIn()
          }}>
            <ArrowBack/>
          </div>
            <form action="" className={`${styles.ctnFormLogin} ${stylesThree.ctnFormLogin2}`}>
                <p>enter your email</p>
                <input type="text" />
                <div onClick={(e)=> { 
                  OpenEnterCode()
                  CloseModal()
                  e.preventDefault()
                }} className={stylesThree.ctnBtn}><BtnHome text={"Log In"} color={true}/></div>
            </form>
        </section>
      </div>
</main>
  )
}
