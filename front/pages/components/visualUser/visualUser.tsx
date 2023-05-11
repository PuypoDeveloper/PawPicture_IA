import React, {useState,useEffect, useContext} from 'react'
import styles from "./visualUser.module.css"
import ReplayIcon from '@mui/icons-material/Replay';
import dataDescription from "./description.json"
import { Configuration, OpenAIApi } from "openai";
import Image from 'next/image';
import { counterCountext } from '../../context/counterContext';
import { headers } from 'next/dist/client/components/headers';
import { error } from 'console';
import BtnHome from '../Elements/Buttons/BtnHome';
import { Inter,Fredoka } from '@next/font/google'


const fredoka = Fredoka({ subsets: ["latin"], 
weight: ["400","600"]})

export default function VisualUserC() {
     //VERIFY STATE USER

     const {email} = useContext(counterCountext)
     const [addNewImage, setAddImage] = useState<object[]>([])

    
     useEffect(()=> { 
         dataDescription.userId = JSON.parse(email) 
         const url = "http://localhost:4000/images/SEND"
    const formData = dataDescription
    fetch(url,{ 
        method: "POST",
        body: JSON.stringify(formData),
        headers: {"content-Type":"application/json"},
    })
    .then (response => response.json())
    .then(data => { 
        console.log(data)
        setAddImage(data)
    })

     },[email])


    // CHARGE INFO USER
    
    //OPEN MODAL GENERETE IMAGES

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
    
    //COUNTER ADD IMAGES

    const [counter, setCounter] = useState(0)

    //CONFIG API OPEN IA

    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState(
      "Search"
    );

    const configuration = new Configuration({
        apiKey: "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",
      });
 

    const openai = new OpenAIApi(configuration);

    const generateImage = async (e:React.MouseEvent) => {
        e.preventDefault()
        setPlaceholder(`Search ${prompt}..`);
        setLoading(true);
        const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
        });
        setLoading(false);
        setResult(res.data.data[0].url);
  };

    
// ADD IMAGES OF THE BODY 

const saveImage = () => { 
    setCounter(counter+1)
    if (result !== undefined) { 
        dataDescription.prompt = prompt
        dataDescription.url = result
        const formData = dataDescription
        const url = "http://localhost:4000/images/URL"
        fetch(url, { 
            method:"POST",
            body: JSON.stringify(formData),
            headers: {"content-Type":"application/json"}
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data)
        })
        .catch (error => { 
            console.error("todo se fue a la mierda")
        })
    }

}

const addImage = (image:string) => { 
    const newImage = {url: image}
    setAddImage([...addNewImage,newImage])
    
}

useEffect(()=> {
    if (counter >= 1 && result !== undefined) { 
        addImage(result)
    }
},[counter])

//MASAGE STRING TOO SHORT

    useEffect(()=> { 
        const b = document.getElementById("description")
        if(prompt.length > 5) { 
            if (b !== null) { 
                b.style.display = "none" 
            }
        }
        else { 
            if (b !== null) { 
                b.style.display = "flex" 
            }
        }
    },[prompt])
    



  return (
    <main className={styles.main}>
        <div className={styles.ctnPerfilUser}>
            <section className={styles.btnGenerateImage}>
                <div onClick={openGeneretedImages} className={styles.ctnImages}><BtnHome text={"Generate images"} color={false}/></div>
            </section>
            <section className={styles.yourImages}>
                <h2>Your images</h2>
                <div className={styles.generatedImages}>
                    <img src="./img/imagesGenereted/1.png" alt="" />
                    <img src="./img/imagesGenereted/2.png" alt="" />
                    <img src="./img/imagesGenereted/3.png" alt="" />
                    <img src="./img/imagesGenereted/4.png" alt="" />
                    <img src="./img/imagesGenereted/5.png" alt="" />
                    <img src="./img/imagesGenereted/6.png" alt="" />
                    <img src="./img/imagesGenereted/7.png" alt="" />
                    <img src="./img/imagesGenereted/8.png" alt="" />
                    { 
                        addNewImage.map((img,index)=> (
                            <img key={index} src={img.url} />
                        ))
                    }
                </div>
            </section>
            <section className={styles.modalGeneretedImage} id='modalGeneretedImage' onClick={closeModal}>
                <div className={styles.ctnGenereted} onClick={stopPropagation}>
                    <div className={styles.ctnBoxesGenereted}>
                        <form className={styles.inputText}>
                            <h3 className={fredoka.className}>Describe your pet and generate a great image</h3>
                            <textarea name="" id="" placeholder={placeholder} onChange={(e) => setPrompt(e.target.value)}/>
                            <div onClick={generateImage} className={styles.ctnBtnGeneretedImages}><BtnHome text={"Generate images"} color={false}/></div>
                        </form>
                        <div className={styles.resultImages}>
                        {loading ? (
                            <>
                            <div className={styles.ctnAnimationCreateImage}>
                                <h2 className={`${styles.textPlaseWait} ${fredoka.className}`}>Generating Please Wait...</h2>
                                <div className={styles.parent}>
                                    <div className={`${styles.child} ${styles.one}`}></div> 
                                    <div className={`${styles.child} ${styles.two}`}></div> 
                                    <div className={`${styles.child} ${styles.three}`}></div> 
                                    <div className={`${styles.child} ${styles.four}`}></div> 
                                    <div className={`${styles.child} ${styles.five}`}></div> 
                                    <div className={`${styles.child} ${styles.sex}`}></div> 

                                    
                                </div>
                            </div>
                                                </>
                            ) : (
                                <>
                                {result.length > 0 ? (
                                    <img className={styles.result_image} src={result} alt="result" />
                                ) : (
                                    <></>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.ctnBtnSaveImage} onClick={saveImage}><BtnHome text={"Save"} color={true}/></div>
                </div>
            </section>  
        </div>
    </main>
  )
}
