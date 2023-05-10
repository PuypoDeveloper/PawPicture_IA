import React, { useContext, useEffect, useState } from 'react'
import styles from "../Login/logIng.module.css"
import stylesThree from "./SignUp.module.css"
import stylesTwo from "../general.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import data from "./SignUp.json"
import { useRouter } from 'next/router';
import { counterCountext } from '../../../context/counterContext';
import BtnHome from '../../Elements/Buttons/BtnHome';
import ArrowBack from '../../Elements/ArrowBack/ArrowBack';

interface Props { 
    isOpen: boolean,
    CloseModal: (()=>void),
    OpenLogIn: (()=>void)
}

export default function SignUp({isOpen,CloseModal,OpenLogIn}:Props) {

    //event handler

    const {userInt,ChangeUser,ChangeEmail} = useContext(counterCountext) 

    //capture data form
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [name, setName] = useState("")
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

    const captureName = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const a = e.target.value
        data.name=a
        setName(a)
        
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
    const [dataUser, setDataUser] = useState([])

    const createAcount = (e:React.MouseEvent)=> { 
        e.preventDefault()
        if (user.length > 1 && password.length > 1 && name.length>1 && passwordEquals === false) { 
            const formData = data
            const enpoint = 'http://localhost:4000/links/newUser'
            const enpointUser = 'http://localhost:4000/links/verifyUser'
            fetch(enpoint, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {"content-Type": "application/json"}
            })
            .then( response => response.json())
            .then(data => { 
                if ( typeof data === "boolean") {   
                    setCheck(true)                  
                }
                else if (typeof data === "object") { 
                    setCheck(false) 
                    console.log("queee pasaaaa: "+data)
                    ChangeEmail(data[0])
                    ChangeUser(data[1])
                    userInt()
                    router.push("/visualUser")
                }
            })
            .catch( error=> { 
                console.error("Error de envio")
            })
        }
    }

  return (
    <main className={`${isOpen ? stylesTwo.mainCreate:stylesTwo.mainCreateOff }`} onClick={CloseModal}>
        <div className={styles.ctnModal}>
            <div className={`${styles.ctnSection} ${stylesThree.ctnSection2}`} onClick={stopPropagation}>
                <div onClick={()=>{
                    CloseModal()
                    OpenLogIn()
                }} className={stylesThree.arrowBack}>
                    <ArrowBack/>
                </div>
                <section className={styles.nameIcon}>
                    <div>
                        <img src="./img/logo.png" alt="" className={stylesTwo.imageLogo} />
                        <h2 className={stylesThree.title}>Sign up to CatDog IA</h2>
                    </div>
                </section>
                <section className={`${styles.ctnFormLogin} ${stylesThree.ctnFormLogin2}`}>
                    <form action="" className={`${styles.Form} ${stylesThree.form2}`}>
                        <div className={stylesThree.ctnDivForm}>
                            <p>email</p>
                            <input type="email" onChange={captureUser} />
                            <p className={check ? stylesThree.emailIncorrectOn : stylesThree.emailIncorrectOf}>existing user</p>
                        </div>
                        <div className={stylesThree.ctnDivForm}>
                            <p>name</p>
                            <input type="text" onChange={captureName}/>
                        </div>
                        <div className={stylesThree.ctnDivForm}>
                            <p>Password</p>
                            <input type="password" onChange={capturePassword} />
                        </div>
                        <div className={stylesThree.ctnDivForm}>
                            <p>Repeat password</p>
                            <input type="password" onChange={captureRepeatPassword} />
                        </div>
                        <p className={ passwordEquals ? stylesThree.passwordEqualOn : stylesThree.passwordEqual} id='passwordEqual' >The passwords do not match</p>
                        <div onClick={createAcount} className={styles.btnLogIn}><BtnHome text={"Log In"} color={false}/></div>
                    </form>
                </section>
            </div>
        </div>
</main>
  )
}
