
import {useState} from 'react'

/**USE MODAL DE LOGN */

const useUserState = ():[boolean, () => void, ()=> void ] => {

    const [IsOpenUser, setOpenUser] = useState(false)

    const OpenUser = ()=> { 
        setOpenUser(true)
    }

    const CloseUser = ()=> {
        if (event !== undefined) { 
            event.preventDefault()
            setOpenUser(false)
        }
    }

 
  return [IsOpenUser, OpenUser, CloseUser]
}

export default useUserState