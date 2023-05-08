import React, {useEffect, useState} from 'react'
import styles from "./logIng.module.css"
import stylesTwo from "../general.module.css"
import Link from 'next/link'
import data from "./data.json"
import cors from "cors"



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

    const captureUsername = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const username = e.target.value
        data.username = username
    }

    const capturepassword = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const password = e.target.value
        data.password = password
    }


    /**verifying requirements of the form */

    const [check, setCheck] = useState(false)

    const assessData = () => { 
        if (data.username.length >1 && data.password.length>1) { 
            setCheck(true)
            const formData = data
            const a = 'http://localhost:4000/user-login'
            fetch(a, { 
                method: "POST",
                body:JSON.stringify(formData),
                headers: {"content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(data => { 
                console.log("Respuesta del back: ",data)
            })
            .catch( error=> { 
                console.log("Error de envio")
            })
        }
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
                        <input type="text" onChange={captureUsername} />
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
                        <input type="password" onChange={capturepassword}/>
                    </div>
                    <button className={styles.btnLogIn} onClick={assessData}><Link href={check ? "/visualUser" : ""}>Entrar</Link></button>
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
