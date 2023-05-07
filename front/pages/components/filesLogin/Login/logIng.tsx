import React from 'react'
import styles from "./logIng.module.css"
import stylesTwo from "../general.module.css"

interface Props { 
    isOpen: unknown,
    CloseModal: ()=>void,
    OpenCreate: ()=>void,
    OpenForgot: ()=>void,
}

export default function LogIng({isOpen, CloseModal, OpenCreate, OpenForgot}:Props) {

    const PreventClose = (e:React.MouseEvent<HTMLDivElement>) => { 
        e.stopPropagation()
    }

  return (
    <main className={`${isOpen ? stylesTwo.mainLogin: stylesTwo.mainLoginOff}`} onClick={()=>{ 
        CloseModal()
    }}>
        <div className={styles.ctnSection} onClick={PreventClose}>
            <section className={styles.nameIcon}>
                <div>
                    <img src="./img/logo.png" alt="" className={stylesTwo.imageLogo}  />
                    <h2>Sign in to CatDog IA</h2>
                </div>
            </section>
            <section className={styles.ctnFormLogin}>
                <form action="" className={styles.Form}>
                    <div className={styles.username}>
                        <p>Username or email address</p>
                        <input type="text" />
                    </div>
                    <div className={styles.ctnPassword}>
                        <div>
                            <p>Password</p>
                            <a href="" onClick={()=> { 
                                CloseModal()
                                OpenForgot()
                            }
                            }>Forgot Password ?</a>
                        </div>
                        <input type="password" />
                    </div>
                    <button className={styles.btnLogIn}>Sign in</button>
                </form>
            </section>
            <section className={styles.newInCatDog}>
                <div>
                    <p>New to CatDog IA ?</p>
                    <a href="" onClick={()=> { 
                        CloseModal()
                        OpenCreate()
                    }}>Create an account</a>
                </div>
            </section>
        </div>
    </main>
  )
}
