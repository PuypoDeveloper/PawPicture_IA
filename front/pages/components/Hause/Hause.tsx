import React, { use, useEffect, useState } from 'react'
import styles from "./Hause.module.css"
import data from "./Hause.json"
import { Inter,Fredoka } from '@next/font/google'



const fredoka = Fredoka({ subsets: ["latin"], 
weight: ["400","600"]}) 



export default function Hause() {


  /** MANAGEMENT OF CARDS STATUS */


  const [on, setOn] = useState(false)
  const openLogin = (prop:any) => { 
    setOn(prop)
  } 



  return (
    <>
    <main className={styles.main}>
      <section className={styles.imageCat}>
          <img src="./img/cat.png" alt="" />
      </section>
      <section className={styles.information}>
          <div className={styles.textInformation}>
              <h1 className={fredoka.className}>{data.title}</h1>
              <h3>{data.firstText}</h3>
              <p>{data.description}</p>
          </div>
          <div className={styles.ctnbtnGetStarted}>
              <button className={styles.btnGetStarted} onClick={openLogin}>
                   <p className={fredoka.className} >Get Started</p>
              </button>
          </div>
          <div className={styles.catVsDog}>
              <div className={styles.pointsCat}>
                    <img src="" alt="" />
                    <div>
                      <p>2</p>
                    </div>
              </div>
              <h3 className={fredoka.className} >VS</h3>
              <div className={styles.pointsDog}>
                    <img src="" alt="" />
                    <div>
                      <p>1</p>
                    </div>
              </div>
          </div>
      </section>
      <section className={styles.imageDog}>
          <img src="./img/dog.png" alt="" />
      </section>
    </main>
    </>
  )
}
