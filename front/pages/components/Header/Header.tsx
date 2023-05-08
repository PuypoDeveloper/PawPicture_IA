import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./Header.module.css"
import Image from 'next/image'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HandlingSatus from '../filesLogin/handlingSatus';
import Link from 'next/link';

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
    } 

    const openSignUp =(prop:any)=> { 
        setOnSign(prop)
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

  return (
    <>
        <nav className={styles.navBar}>
            <section className={styles.icon}>
                <Link href="/App">
                    <img src="/img/logo.png" alt="" />
                </Link>
            </section>
            <section className={styles.menu}>
                <ul className={styles.menuList}>
                    <div className={userIn ?  styles.viewImagesChangeUser: styles.viewImages} onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li>View images</li> 
                        <li><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <ul className={styles.viewImagesList} id='viewImagesList' onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li><Link href="/publicVisual">Team Cats</Link></li>
                        <li>Team Dogs</li>
                        <li>Cats and Dogs</li>
                    </ul>
                    <li onClick={openLogin} className={userIn ? styles.ofLogIn: styles.onLogIn }>Log in</li>
                    <li onClick={openSignUp} className={userIn ? styles.ofSignUp: styles.onSignUp }>Sign up</li>
                    <div className={userIn ? styles.onUserProfile: styles.ofUserProfile} onMouseMove={showItemsUser} onMouseLeave={hideItemsUser}>
                        <img src="./img/perfil.png" alt="" />
                    </div>
                    <ul className={userIn ? styles.onDropDownUser: styles.ofDropDownUser} id='dropDownUser' onMouseMove={showItemsUser} onMouseLeave={hideItemsUser}>
                        <li>Name</li>
                        <li><Link href="/visualUser">Your images</Link></li>
                        <li>Change of password</li>
                        <li>Log out</li>
                    </ul>
                </ul>
            </section>
            <section className={styles.IconHamburger} onClick={ActiveMenuHamburger}>
                <MenuRoundedIcon/>
            </section>
            <section className={styles.menuHamburger} id='menuHamburger' onClick={desactiveMenuHamburger}>
                <ul className={styles.menuListTwo} id="menuListTwo" onClick={stopPropagation}>
                    <div className={styles.viewImagesH} onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li>View images</li> 
                        <li ><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <ul className={styles.viewImagesListH} id='viewImagesListH'>
                        <li>Team Cats</li>
                        <li>Team Dogs</li>
                        <li>Cats and Dogs</li>
                    </ul>
                    <li>Log in</li>
                    <li>Sign up</li>
                </ul>
            </section>
            <div className={styles.LogIn} id='LogIn'>
                <HandlingSatus On={on} onSign={onSign} />
            </div>
        </nav>
    </>
  )
}
