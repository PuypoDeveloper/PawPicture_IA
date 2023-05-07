
import {useState} from 'react'

/**USE MODAL DE LOGN */

const useModalCode = ():[boolean, () => void, ()=> void ] => {

    const [IsOpenModal, setOpenModal] = useState(false)

    /**FUNCIONES OPEN MODAL DESDE HOME */

    const OpenModal = ()=> { 
        setOpenModal(true)
    }

    const CloseModal = ()=> {
        if (event !== undefined) { 
            event.preventDefault()
            setOpenModal(false)
        }
    }

    /**FUNCIONES OPEN FOTGOT PASSWORD DESDE LOGIN */
 
  return [IsOpenModal, OpenModal, CloseModal]
}

export default useModalCode