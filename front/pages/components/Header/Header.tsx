import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./Header.module.css"
import Image from 'next/image'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';



export default function Header() {
    
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

    
  return (
    <>
        <nav className={styles.navBar}>
            <section className={styles.icon}>
                <img src="/img/logo.png" alt="" />
            </section>
            <section className={styles.menu}>
                <ul className={styles.menuList}>
                    <div className={styles.viewImages} onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li>View images</li> 
                        <li><ArrowDropDownRoundedIcon/></li>   
                    </div>
                    <ul className={styles.viewImagesList} id='viewImagesList' onMouseMove={activeViewImages} onMouseLeave={deactivateViewImage}>
                        <li>Team Cats</li>
                        <li>Team Dogs</li>
                        <li>Cats and Dogs</li>
                    </ul>
                    <li onClick={openLogin}>Log in</li>
                    <li onClick={openSignUp}>Sign up</li>
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
        </nav>
    </>
  )
}
