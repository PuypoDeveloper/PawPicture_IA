import React from 'react'
import styles from "./ForgotPassword.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        <form action="" className={styles.ctnFormLogin} onClick={stopPropagation}>
            <div onClick={()=> { 
                  CloseModal()
                  OpenEnterCode()
                }}>
                    <ArrowBackIcon/>
            </div>
            <p>New password</p>
            <input type="password" />
            <p>Repeat new password</p>
            <input type="password" />
            <button onClick={(e)=>{ 
              CloseModal()
              OpenCheck()
              e.preventDefault()
            }}>Change</button>
        </form>
</main>
  )
}
