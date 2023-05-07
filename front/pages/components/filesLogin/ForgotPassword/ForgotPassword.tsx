import React from 'react'
import styles from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
    <section className={styles.ctnFormLogin} onClick={stopPropagation}>
      <div onClick={()=>{ 
        CloseModal()
        OpenLogIn()
      }}>
        <ArrowBackIcon/>
      </div>
        <form action="">
            <p>enter your email</p>
            <input type="text" />
            <button onClick={(e)=> { 
              OpenEnterCode()
              CloseModal()
              e.preventDefault()
            }}>Send</button>
        </form>
    </section>
</main>
  )
}
