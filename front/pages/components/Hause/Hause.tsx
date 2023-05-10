import React, {useEffect, useState, useContext } from 'react'
import styles from "./Hause.module.css"
import data from "./Hause.json"
import { Inter,Fredoka } from '@next/font/google'
import HandlingSatus from '../filesLogin/handlingSatus'
import useUserState from '../hooks/stateUser'
import { counterCountext } from '../../context/counterContext'
import classNames from 'classnames';
import Link from 'next/link'
import gsap from "gsap"
import BtnHome from "../Elements/Buttons/BtnHome"


const fredoka = Fredoka({ subsets: ["latin"], 
weight: ["400","600"]}) 



export default function Hause() {

  const {stateUser,userInt,userOut} = useContext(counterCountext)


  /** MANAGEMENT OF CARDS STATUS */


  const [on, setOn] = useState(false)
  const openLogin = (prop:any) => { 
    setOn(prop)
  } 


  /** USER STATE */

  const [test, setTest] = useState(false)

  useEffect(()=> { 
    setTest(stateUser)
  },[stateUser])


  /** ANIMATION CAROUSEL */

  useEffect(()=> { 
    let tl1 = gsap.timeline({ 
      repeat: Infinity,
      yoyo: true
    })
    tl1.to("#ctnMove", { 
      duration: 5,
      x: -500,
      ease: "linear"
    })
    tl1.to("#ctnMove", { 
      duration: 5,
      x: 0,
      ease: "linear",
      delay: 0.1 // agregamos un delay para evitar el efecto intermitente
    })

  },[])


  

  return (
    <>
    <main className={styles.main}>
      <section className={styles.information}>
          <div className={styles.ctnInformation}>
            <div className={styles.textInformation}>
                <h1 className={fredoka.className}>{data.title}</h1>
                <h3>{data.firstText}</h3>
                <p>{data.description}</p>
            </div>
            <div className={styles.ctnbtnGetStarted}>
                <div className={test ? styles.btnGetStartedOf: styles.btnGetStarted } onClick={openLogin}>
                      <BtnHome text={"Get Started"} color={false}/>
                </div>
                <div className={test ? styles.btnGeneretedOn :styles.btnGeneretedOf}>
                    <Link className={styles.ctnLinkBtn} href={"/visualUser"}>
                        <BtnHome text={"Genereted Image"} color={true}/>
                    </Link>
                </div>

            </div>
        </div>
      </section>
      <section className={styles.carousel}>
            <div className={styles.ctnFixed}>
              <div className={styles.ctnMove} id='ctnMove'>
                  <img src="./img/carousel/1.png" alt="" />
                  <img src="./img/carousel/2.png" alt="" />
                  <img src="./img/carousel/3.png" alt="" />
                  <img src="./img/carousel/4.png" alt="" />
                  <img src="./img/carousel/5.png" alt="" />
                  <img src="./img/carousel/6.png" alt="" />
                  <img src="./img/carousel/7.png" alt="" />
                  <img src="./img/carousel/8.png" alt="" />
                  <img src="./img/carousel/9.png" alt="" />
                  <img src="./img/carousel/1.png" alt="" />
                  <img src="./img/carousel/2.png" alt="" />


              </div>
            </div>
      </section>
      <div className={styles.LogIn} id='LogIn'>
        <HandlingSatus On={on} onSign={false}/>
      </div>
    </main>
    </>
  )
}
