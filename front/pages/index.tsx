import Head from 'next/head'
import Image from 'next/image'
import { Inter,Fredoka } from '@next/font/google'
import App from './App'
import StateCompo from './context/StateCompo'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <StateCompo>
      <App/>
    </StateCompo>
    </>
  )
}
