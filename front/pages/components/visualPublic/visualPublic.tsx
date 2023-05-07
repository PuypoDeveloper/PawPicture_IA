import React from 'react'
import styles from "./stylesVisualPublic.module.css"

export default function VisualPublic() {
  return (
    <main className={styles.main}>
        <div className={styles.ctnAllImages}>
            <h2>all images generate</h2>
            <div className={styles.Images}>
                    <img src="./img/imagesGenereted/1.png" alt="" />
                    <img src="./img/imagesGenereted/2.png" alt="" />
                    <img src="./img/imagesGenereted/3.png" alt="" />
                    <img src="./img/imagesGenereted/4.png" alt="" />
                    <img src="./img/imagesGenereted/5.png" alt="" />
                    <img src="./img/imagesGenereted/6.png" alt="" />
                    <img src="./img/imagesGenereted/7.png" alt="" />
                    <img src="./img/imagesGenereted/8.png" alt="" />
                    <img src="./img/imagesGenereted/9.png" alt="" />
                    <img src="./img/imagesGenereted/10.png" alt="" />
            </div>
        </div>
    </main>
  )
}
