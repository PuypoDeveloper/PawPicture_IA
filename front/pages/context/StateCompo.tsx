import React, { Children, useState } from 'react'
import {counterCountext} from "./counterContext"

export default function StateCompo({children}:{ children: React.ReactNode }) { 

  //USER STATUS

    const [stateUser, setStateUser] = useState(() => {
        if (typeof window !== 'undefined') {
          return JSON.parse(window.localStorage.getItem('stateUser') || 'false');
        } else {
          return false;
        }
      });

  const userInt = () => {
    try {
      setStateUser(true);
      window.localStorage.setItem('stateUser', JSON.stringify(true));
    } catch (error) {
      console.error(error);
    }
  };

  const userOut = () => {
    try {
      setStateUser(false);
      window.localStorage.setItem('stateUser', JSON.stringify(false));
    } catch (error) {
      console.error(error);
    }
  }; 


  //NAME USER

  const [nameUser, setNameUser] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('nameUser') || "false";
    } else {
      return "user";
    }
  });

  const ChangeUser = (name:string) => { 
    try {
      setNameUser(name);
      window.localStorage.setItem('nameUser', JSON.stringify(name));
    } catch (error) {
      console.error(error);
    }
  }

  // EMAIL USER
  
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('emailUser') || "false";
    } else {
      return "user";
    }
  });

  const ChangeEmail = (email:string) => { 
    try {
      setEmail(email);
      window.localStorage.setItem('emailUser', JSON.stringify(email));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <counterCountext.Provider 

    value={{
        stateUser,
        userInt,
        userOut,
        nameUser,
        ChangeUser,
        email,
        ChangeEmail   
    }} 
    >
        {children}
    </counterCountext.Provider>
  )
}
 