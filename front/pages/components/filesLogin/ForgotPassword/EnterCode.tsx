import React from 'react'
import styles from "../Login/logIng.module.css"
import stylesThree from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBack from '../../Elements/ArrowBack/ArrowBack';
import BtnHome from '../../Elements/Buttons/BtnHome';

interface Props { 
  isOpen:boolean,
  CloseModal: (()=>void),
  OpenEnterEmail:(()=>void),
  OpenNewPassword:(()=>void)
}

export default function EnterCode({isOpen, CloseModal, OpenEnterEmail, OpenNewPassword}:Props) {

  const stopPropagation = (e:React.MouseEvent<HTMLElement>) => { 
    e.stopPropagation()
  }

  return (
    <main className={`${ isOpen ? stylesTwo.OpenModal: stylesTwo.CloseModal}`} onClick={CloseModal}>
          <div className={styles.ctnModal2}>
              <section onClick={stopPropagation} className={`${styles.ctnSection} ${stylesThree.ctnSection2}`} >
                  <div onClick={()=> { 
                    CloseModal()
                    OpenEnterEmail()
                  }}>
                      <ArrowBack/>
                  </div>
                  <form action="" className={`${styles.ctnFormLogin} ${stylesThree.ctnFormLogin2}`}>
                    <p>Enter the code sent to your email</p>
                    <input type="text" />
                    <div onClick={(e)=>{ 
                      CloseModal()
                      OpenNewPassword()
                      e.preventDefault()
                    }} className={stylesThree.ctnBtn}><BtnHome text={"Send"} color={true}/></div>
                    <p className={stylesThree.incorrect}>incorrect</p>
                  </form>
              </section>
          </div>
    </main>
  )
}