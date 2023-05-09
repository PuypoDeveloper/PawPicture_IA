import { func, object } from "prop-types"
import { createContext } from "react"

export const counterCountext = createContext({ 
    stateUser: false,
    userInt: () => {},
    userOut:()=>{}
})