import React from 'react'
import styles from "../Login/logIng.module.css"
import stylesThree from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBack from '../../Elements/ArrowBack/ArrowBack';
import BtnHome from '../../Elements/Buttons/BtnHome';

interface Props { 
  isOpen: boolean,
  CloseModal: (()=>void), 
  OpenEnterCode: (()=>void),
  OpenCheck:(()=>void)
}

export default function NewPassword ({isOpen, CloseModal, OpenEnterCode, OpenCheck}:Props) {
  const stopPropagation = (e:React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }
  return (
    <main className={`${isOpen ? stylesTwo.OpenModal: stylesTwo.CloseModal}`} onClick={CloseModal}>
      <div className={styles.ctnModal2}>
        <section className={`${styles.ctnSection} ${stylesThree.ctnSection2}`}  onClick={stopPropagation}>
            <div onClick={()=> { 
                  CloseModal()
                  OpenEnterCode()
                }}>
                    <ArrowBack/>
            </div>
            <form action="" className={`${styles.ctnFormLogin} ${stylesThree.ctnFormLogin3}`}>
              <div>
                <p>New password</p>
                <input type="password" />
              </div>
              <div>
                <p>Repeat new password</p>
                <input type="password" />
              </div>
              <div onClick={(e)=>{ 
                CloseModal()
                OpenCheck()
                e.preventDefault()
              }} className={stylesThree.ctnBtn}><BtnHome text={"Change"} color={true}/></div>
            </form>
        </section>
      </div>
  </main>
  )
}
