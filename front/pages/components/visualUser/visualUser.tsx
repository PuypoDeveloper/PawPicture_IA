import React, {useState,useEffect} from 'react'
import styles from "./visualUser.module.css"
import ReplayIcon from '@mui/icons-material/Replay';
import dataDescription from "./description.json"
import { Configuration, OpenAIApi } from "openai";
import Image from 'next/image';

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
    
    //Capture description pet 

    const [description, setDescription] = useState("")
    const [counter, setCounter] = useState(0)

    const captureDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => { 
        const a = e.target.value
        setDescription(a)
    }



    //configuracion 
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState(
      "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
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
        console.log(res.data.data[0].url)
        setPrompt(description)
        setCounter(counter+1)
  };

    
// add image of the body 

const [addNewImage, setAddImage] = useState<object[]>([])

console.log("QUEEEEEEEEEEEE MIERDAAAAAAAAAAAAAAA: "+addNewImage.length)


const addImage = (image:string) => { 
    const newImage = {srt: image}
    setAddImage([...addNewImage,newImage])
    
}

useEffect(()=> {
    if (counter >= 1 && result !== undefined) { 
        addImage(result)
    }
},[counter])


    useEffect(()=> { 
        const b = document.getElementById("description")
        if(description.length > 5) { 
            if (b !== null) { 
                b.style.display = "none" 
            }
        }
        else { 
            if (b !== null) { 
                b.style.display = "flex" 
            }
        }
    },[description])

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
                    { 
                        addNewImage.map((img,index)=> (
                            <img key={index} src={img.srt} />
                        ))
                    }
                </div>
            </section>
            <section className={styles.modalGeneretedImage} id='modalGeneretedImage' onClick={closeModal}>
                <div className={styles.ctnGenereted} onClick={stopPropagation}>
                    <div className={styles.ctnBoxesGenereted}>
                        <form className={styles.inputText}>
                            <ReplayIcon/>
                            <h3>Describe your pet and generate a great image</h3>
                            <textarea name="" id="" placeholder={placeholder} onChange={(e) => setPrompt(e.target.value)}/>
                            <button onClick={generateImage}>Generate</button>
                            <p className={styles.description} id='description'>entered value too short</p>
                        </form>
                        <div className={styles.resultImages}>
                        {loading ? (
                            <>
                            <h2>Generating..Please Wait..</h2>
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                            </>
                            ) : (
                                <>
                                {result.length > 0 ? (
                                    <img className="result-image" src={result} alt="result" />
                                ) : (
                                    <></>
                                )}
                                </>
                            )}
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
