import React from 'react'
import styles from "./visualUser.module.css"
import ReplayIcon from '@mui/icons-material/Replay';

export default function VisualUserC() {

    const openGeneretedImages = () => { 
        const modalGeneretedImage =  document.getElementById("modalGeneretedImage")
        if (modalGeneretedImage !== null) { 
            modalGeneretedImage.style.display = "flex"
        }

    }

    const closeModal = () => { 
       const  modalGeneretedImage = document.getElementById("modalGeneretedImage")
       if (modalGeneretedImage !== null) { 
        modalGeneretedImage.style.display = "none"
       }
    }

    const stopPropagation = (e:React.MouseEvent) => { 
        e.stopPropagation()
    }
       

  return (
    <main className={styles.main}>
        <div className={styles.ctnPerfilUser}>
            <section className={styles.btnGenerateImage}>
                <button onClick={openGeneretedImages}>Generate images</button>
            </section>
            <section className={styles.yourImages}>
                <h2>your images</h2>
                <div className={styles.generatedImages}>
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
            </section>
            <section className={styles.modalGeneretedImage} id='modalGeneretedImage' onClick={closeModal}>
                <div className={styles.ctnGenereted} onClick={stopPropagation}>
                    <div className={styles.ctnBoxesGenereted}>
                        <div className={styles.inputText}>
                            <ReplayIcon/>
                            <h3>Describe your pet and generate a great image</h3>
                            <textarea name="" id="" placeholder='Describe your pet'></textarea>
                            <button>Generate</button>
                        </div>
                        <div className={styles.resultImages}>
                            <h3>Result</h3>
                        </div>
                    </div>
                    <button>Save</button>
                    <button>Discart</button>
                </div>
            </section>  
        </div>
    </main>
  )
}
