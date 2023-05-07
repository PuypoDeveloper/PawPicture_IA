import React from 'react'
import styles from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
            <form action="" onClick={stopPropagation} className={styles.ctnFormLogin} >
                <div onClick={()=> { 
                  CloseModal()
                  OpenEnterEmail()
                }}>
                    <ArrowBackIcon/>
                </div>
                <p>Enter the code sent to your email</p>
                <input type="text" />
                <button onClick={(e)=>{ 
                  CloseModal()
                  OpenNewPassword()
                  e.preventDefault()
                }}>Send</button>
                <p>Correct</p>
                <p>incorrect</p>
            </form>
    </main>
  )
}