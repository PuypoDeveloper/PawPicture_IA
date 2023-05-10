import React, {useEffect, useState, useContext} from 'react'
import styles from "./logIng.module.css"
import stylesTwo from "../general.module.css"
import Link from 'next/link'
import data from "./data.json"
import { useRouter } from 'next/router'
import cors from "cors"
import useUserState from '../../hooks/stateUser'
import { counterCountext } from '../../../context/counterContext'



interface Props { 
    isOpen: unknown,
    CloseModal: ()=>void,
    OpenCreate: ()=>void,
    OpenForgot: ()=>void,
}

export default function LogIng({isOpen, CloseModal, OpenCreate, OpenForgot}:Props) {


    //state of user
     
    const {userInt,ChangeUser,ChangeEmail} = useContext(counterCountext)

    const PreventClose = (e:React.MouseEvent<HTMLDivElement>) => { 
        e.stopPropagation()
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const captureUsername = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const username = e.target.value
        setUsername(username)
        data.username = username
    }

    const capturepassword = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const password = e.target.value
        setPassword(password)
        data.password = password
    }


    /**verifying requirements of the form */

    const [check, setCheck] = useState(false)
    const [check2, setChec2k] = useState(false)

  
    const router = useRouter();

    const assessData = (e:React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault()
        if (username.length >1 && password.length>1) { 
            const formData = data
            const a = 'http://localhost:4000/links/verifyUser'
            fetch(a, { 
                method: "POST",
                body:JSON.stringify(formData),
                headers: {"content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(data => { 
                if(data === "nonexistent_account") { 
                    setCheck(true)
                }
                else if (data === "Incorrect_password") { 
                    setCheck(false)
                    setChec2k(true)
                }
                else if (data[0] === "correct_password") { 
                    setCheck(false)
                    setChec2k(false)
                    ChangeEmail(data[2])
                    ChangeUser(data[1])
                    userInt()
                    router.push("./visualUser")
                }
            })
            .catch( error=> { 
                console.error("Error de envio")
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
                        <p className={check ? styles.notRegisterAccountOn : styles.notRegisterAccountOf}>account not registered</p>
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
                        <p className={check2 ? styles.incorrectPasswordOn : styles.incorrectPasswordOf }>Incorrect password</p>
                    </div>
                    <button className={styles.btnLogIn} onClick={assessData}>Entrar</button>
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
