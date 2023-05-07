import React from 'react'
import styles from "./SignUp.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props { 
    isOpen: boolean,
    CloseModal: (()=>void),
    OpenLogIn: (()=>void)
}

export default function SignUp({isOpen,CloseModal,OpenLogIn}:Props) {

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => { 
        e.stopPropagation()
    }
  return (
    <main className={`${isOpen ? stylesTwo.mainCreate:stylesTwo.mainCreateOff }`} onClick={CloseModal}>
        <div className={styles.ctnCreate} onClick={stopPropagation}>
            <div onClick={()=>{
                CloseModal()
                OpenLogIn()
            }}>
                <ArrowBackIcon/>
            </div>
            <section className={styles.nameIcon}>
                <div>
                    <img src="./img/logo.png" alt="" className={stylesTwo.imageLogo} />
                    <h2>Sign up to CatDog IA</h2>
                </div>
            </section>
            <section className={styles.ctnFormLogin}>
                <form action="">
                    <div>
                        <p>Username or email address</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" />
                    </div>
                    <div>
                        <p>Repeat password</p>
                        <input type="password" />
                    </div>
                    <button>Create</button>
                </form>
            </section>
        </div>
</main>
  )
}
