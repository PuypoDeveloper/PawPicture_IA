import React, { Children, useState } from 'react'
import {counterCountext} from "./counterContext"

export default function StateCompo({children}:{ children: React.ReactNode }) { 

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



  return (
    <counterCountext.Provider 

    value={{
        stateUser,
        userInt,
        userOut
    }}
    >
        {children}
    </counterCountext.Provider>
  )
}
