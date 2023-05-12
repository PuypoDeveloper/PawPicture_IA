import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./Header.module.css"
import { Inter,Fredoka } from '@next/font/google'
import Image from 'next/image'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HandlingSatus from '../filesLogin/handlingSatus';
import Link from 'next/link';
import { counterCountext } from '../../context/counterContext';
import {useRouter} from 'next/router'; 

const fredoka = Fredoka({ subsets: ["latin"], 
weight: ["400","600"]}) 

interface Props { 
    userIn: boolean
}

export default function Header({userIn}: Props) {


    
    
    /**Active menu dropdown of ViewImages */
    const activeViewImages = () => { 
        const viewImagesList = document.getElementById("viewImagesList")
        const viewImagesListH = document.getElementById("viewImagesListH")
        if (viewImagesList !== null) { 
            viewImagesList.style.display = "block"
            if ( viewImagesListH !== null) { 
                viewImagesListH.style.display = "flex"
            }
        }
    }

    /**Desactive menu dropdown of ViewImages */
    const deactivateViewImage = () => { 
        const viewImagesList = document.getElementById("viewImagesList")
        const viewImagesListH = document.getElementById("viewImagesListH")
        if (viewImagesList !== null) { 
            viewImagesList.style.display = "none"
            if ( viewImagesListH !== null) { 
                viewImagesListH.style.display = "none"
            }
        }
    }


    /**Active menu hamburger */

    const ActiveMenuHamburger = () => { 
        const menuHamburger = document.getElementById("menuHamburger")
        if (menuHamburger !== null) { 
            menuHamburger.style.display = "block"
        }
    }

    const desactiveMenuHamburger = () => { 
        const menuHamburger = document.getElementById("menuHamburger")
        if (menuHamburger !== null) { 
            menuHamburger.style.display = "none"
        }
    }

    const stopPropagation = (e:React.MouseEvent) => { 
        e.stopPropagation()
    }

    /** HANDING STATUS LOGEO */

    const [on, setOn] = useState(false)
    const [onSign, setOnSign] = useState(false)



    const openLogin = (prop:any) => { 
      setOn(prop)
      desactiveMenuHamburger()
    } 

    const openSignUp =(prop:any)=> { 
        setOnSign(prop)
        desactiveMenuHamburger()
    }

    /** show features user  */

    const showItemsUser = () => { 
        const dropDownUser: HTMLElement | null = document.getElementById("dropDownUser")
        if (dropDownUser !== null) { 
            dropDownUser.style.display = "flex"
        }
    }

    const hideItemsUser = () => { 
        const dropDownUser: HTMLElement | null = document.getElementById("dropDownUser")
        if (dropDownUser !== null) { 
            dropDownUser.style.display = "none"
        }
    }

    /** user state */

    const {stateUser,userOut,nameUser} = useContext(counterCountext) 
    const [stateInitial, setStateInitial] = useState(userIn)
    const [userName, setUserName] = useState("user")

    useEffect(()=> { 
        if (stateUser === true) { 
            userIn === true
            setStateInitial(true)
            setUserName(JSON.parse(nameUser))
        }
        else if (stateUser === false) { 
            userIn === false
            setStateInitial(false)
        }
    },[stateInitial])


    /** USER OUT */

    const router = useRouter()

    const OutUser = () => { 
        userOut()
        if (window.location.pathname === '/App') {
            location.reload()
        } else {
          router.push("./App")
        }
        localStorage.clear();
      }

    /**name user */

    const openDropDownUserHamburger = () => { 
        const a = document.getElementById("dropDownUserHamburguer"); 
        if (a !== null) { 
            a.style.display="flex"
        }
    }

    const openDropDownUserHamburgerOf = () => { 
        const a = document.getElementById("dropDownUserHamburguer"); 
        if (a !== null) { 
            a.style.display="none"
        }
    }

  return (
    <>
        <nav className={stateInitial ? styles.navBarPink : styles.navBarBlu}>
            <section className={styles.icon}>
                <Link href="/App" className={styles.logoAndTitle}>
                    <img src="/img/logo.png" alt="" />
                    <p className={fredoka.className}>PawPicture IA</p>
                </Link>
            </section>
            <section className={styles.menu}>
                <ul className={styles.menuList}>
                    <div className={stateInitial ?  styles.viewImagesChangeUser: styles.viewImages} onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li>View images</li> 
                        <li><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <div className={stateInitial ? styles.viewImagesListOn :styles.viewImagesList} id='viewImagesList' onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <ul className={stateInitial ? styles.ctnViewImagesListOn :   styles.ctnViewImagesList}>
                            <li><Link href="/publicVisual" className={styles.Team_Cats}>Team Cats</Link></li>
                            <li>Team Dogs</li>
                            <li>Cats and Dogs</li>
                        </ul>
                    </div>
                    <li onClick={openLogin} className={stateInitial ? styles.ofLogIn: styles.onLogIn }>Log in</li>
                    <li onClick={openSignUp} className={stateInitial ? styles.ofSignUp: styles.onSignUp }>Sign up</li>
                    <div className={stateInitial ? styles.onUserProfile: styles.ofUserProfile} onMouseMove={showItemsUser} onMouseLeave={hideItemsUser}>
                        <img src="./img/perfil.png" alt="" />
                    </div>
                    <div className={stateInitial ? styles.onDropDownUser: styles.ofDropDownUser} id='dropDownUser' onMouseMove={showItemsUser} onMouseLeave={hideItemsUser}>
                        <ul className={styles.ctnOnDropDownUser}>
                            <li>{userName}</li>
                            <li><Link href="/visualUser" className={styles.linkVisualUser}>Your images</Link></li>
                            <li>Change password</li>
                            <li onClick={OutUser}>Log out</li>  
                        </ul>
                    </div>
                </ul>
            </section>
            <section className={styles.IconHamburger} onClick={ActiveMenuHamburger}>
                <MenuRoundedIcon className={styles.IconHamburguer}/>
            </section>
            <section className={styles.menuHamburger} id='menuHamburger' onClick={desactiveMenuHamburger}>
                <ul className={styles.menuListTwo} id="menuListTwo" onClick={stopPropagation}>
                    <div className={stateInitial ? styles.ctnLabelUserHamburger :styles.ctnLabelUserHamburgerOf } onMouseMove={openDropDownUserHamburger}>
                        <li className={ stateInitial ? styles.labelUserHamburger : styles.labelUserHamburgerOf}>{userName}</li>
                        <li onClick={openDropDownUserHamburgerOf}><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <div className={stateInitial ? styles.onDropDownUserHamburger: styles.ofDropDownUserHamburguer} id='dropDownUserHamburguer'>
                        <ul className={styles.ctnOnDropDownUserHamburger}>
                            <li><Link href="/visualUser" className={styles.linkVisualUser}>Your images</Link></li>
                            <li>Change password</li>
                            <li onClick={OutUser}>Log out</li>
                        </ul>
                    </div>
                    <div className={styles.viewImagesH} onMouseMove={activeViewImages}>
                        <li >View images</li> 
                        <li  onClick={deactivateViewImage} ><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <ul className={styles.viewImagesListH} id='viewImagesListH'>
                        <li><Link href="/publicVisual" className={styles.Team_Cats}>Team Cats</Link></li>
                        <li>Team Dogs</li>
                        <li>Cats and Dogs</li>
                    </ul>
                    <li className={ stateInitial ? styles.lavelMenuDr0pDownOn : styles.lavelMenuDr0pDown} onClick={openLogin }>Log in</li>
                    <li className={ stateInitial ? styles.lavelMenuDr0pDownOn : styles.lavelMenuDr0pDown}  onClick={openSignUp} >Sign up</li>
                </ul>
            </section>
            <div className={styles.LogIn} id='LogIn'>
                <HandlingSatus On={on} onSign={onSign} />
            </div>
        </nav>
    </>
  )
}
