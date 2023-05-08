import React, { useEffect, useState } from 'react'
import styles from "./SignUp.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import data from "./SignUp.json"
import { useRouter } from 'next/router';

interface Props { 
    isOpen: boolean,
    CloseModal: (()=>void),
    OpenLogIn: (()=>void)
}

export default function SignUp({isOpen,CloseModal,OpenLogIn}:Props) {

    //capture data form
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [passwordEquals, setPasswordsEquals] = useState(false)


    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => { 
        e.stopPropagation()
    }

    const captureUser = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const a = e.target.value 
        data.username = a
        setUser(a)
    }
    const capturePassword = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const a = e.target.value 
        data.password = a
        setPassword(a)
    }
    const captureRepeatPassword = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const a = e.target.value 
        setRepeatPassword(a)
    }

    //Confirm Password equals

    useEffect(()=> { 
        if (password === repeatPassword) { 
           setPasswordsEquals(false)
        }
        else { 
            setPasswordsEquals(true)
        }
    },[password,repeatPassword])

    //communication with backend

    const [check, setCheck] = useState(false)
    const router = useRouter()

    const createAcount = (e:React.MouseEvent<HTMLButtonElement>)=> { 
        e.preventDefault()
        if (user.length > 1 && password.length > 1 && passwordEquals === false) { 
            const formData = data
            const enpoint = 'http://localhost:4000/links/newUser'
            fetch(enpoint, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {"content-Type": "application/json"}
            })
            .then( response => response.json())
            .then(data => { 
                console.log("Respuesta del back: ",data)
                if ( typeof data === "boolean") {   
                    setCheck(true)                  
                }
                else if (typeof data === "object") { 
                    setCheck(false) 
                    router.push("/visualUser")
                }
            })
            .catch( error=> { 
                console.log("Error de envio")
            })
        }
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
                        <input type="text" onChange={captureUser} />
                        <p className={check ? styles.emailIncorrectOn : styles.emailIncorrectOf}>existing user</p>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" onChange={capturePassword} />
                    </div>
                    <div>
                        <p>Repeat password</p>
                        <input type="password" onChange={captureRepeatPassword} />
                    </div>
                    <p className={ passwordEquals ? styles.passwordEqualOn : styles.passwordEqual} id='passwordEqual' >The passwords do not match</p>
                    <button onClick={createAcount}>Create</button>
                </form>
            </section>
        </div>
</main>
  )
}
