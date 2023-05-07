import React, {useEffect} from 'react'
import useModalLogin from './hooks/useModalLogin'
import useModalForgot from './hooks/useModalForgot'
import useModalEmail from './hooks/useModalEmail'
import useModalCreate from './hooks/useModalCreate'
import useModalCode from './hooks/useModalCode'
import useModalCheck from './hooks/useModalCheck'
import LogIng from './Login/logIng'
import SignUp from './SignUp/SignUp'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import EnterCode from './ForgotPassword/EnterCode'
import NewPassword from './ForgotPassword/NewPassword'
import CheckNewPassword from './ForgotPassword/CheckNewPassword'
import useModalStart from './hooks/useModalStart'

interface Props { 
  On: boolean
  onSign: boolean
}

export default function HandlingSatus({On,onSign}:Props) {

  const [IsOpenModalLogin, OpenModalLogin, CloseModalLogin] =  useModalLogin()
  const [IsOpenModalForgot, OpenModalForgot, CloseModalForgot] =  useModalForgot()
  const [IsOpenModalNewPassword, OpenModalNewPassword, CloseModalNewPassword] =  useModalEmail()
  const [IsOpenModalCreate, OpenModalCreate, CloseModalCreate] =  useModalCreate()
  const [IsOpenModalCode, OpenModalCode, CloseModalCode] =  useModalCode()
  const [IsOpenModalCheck, OpenModalCheck, CloseModalCheck] =  useModalCheck()
  const [IsOpenModalStart, OpenModalStart, CloseModalStart] =  useModalStart()


  useEffect(()=> { 
    if(On) { 
      if (typeof OpenModalLogin === "function") { 
        OpenModalLogin()
      }
    }
  },[On])

  useEffect(()=> { 
    if(onSign) { 
      if (typeof OpenModalCreate === "function") { 
        OpenModalCreate()
        CloseModalLogin()
      }
    }
  },[onSign])

  return (
    <>
        <LogIng
            isOpen ={IsOpenModalLogin}
            CloseModal={CloseModalLogin}
            OpenCreate={OpenModalCreate}
            OpenForgot={OpenModalForgot}
     
        />
        <SignUp 
            isOpen ={IsOpenModalCreate}
            CloseModal={CloseModalCreate}
            OpenLogIn={OpenModalLogin}
        />
        <ForgotPassword
            isOpen ={IsOpenModalForgot}
            CloseModal={CloseModalForgot}
            OpenLogIn={OpenModalLogin}
            OpenEnterCode ={OpenModalCode}
        />
        <EnterCode
            isOpen={IsOpenModalCode}
            CloseModal={ CloseModalCode}
            OpenEnterEmail={OpenModalForgot}
            OpenNewPassword = {OpenModalNewPassword}
        />
        <NewPassword
            isOpen={IsOpenModalNewPassword}
            CloseModal={CloseModalNewPassword}
            OpenEnterCode={OpenModalCode}
            OpenCheck={OpenModalCheck}
        />
        <CheckNewPassword
          isOpen={IsOpenModalCheck}
          CloseModal={CloseModalCheck}
        
        />
    
    </>
  )
}
