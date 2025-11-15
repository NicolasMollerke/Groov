import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Link } from "react-router"

function App() {

  return (
    <>
      <main className='min-h-screen flex flex-col items-center m-auto justify-center'>
        <button className='border-4 border-roxop w-full py-[0.8rem] rounded-[2.5rem]'>
          <Link className='text-[1.25rem] text-roxop font-bold' to="login">Já possuo uma conta</Link>
        </button>
        <div className='flex justify-between items-center gap-2 w-full'>
          <hr className='border-roxos rounded-2xl border w-36'/>
          <p className='text-[1rem] font-bold text-roxos'>ou</p>
          <hr className='border-roxos border w-36'/>
        </div>
        <button className='w-full bg-roxop py-[0.8rem] rounded-[2.5rem]'>
          <Link to="/criarConta" className='text-[1.25rem] text-white font-bold' to="criarConta">Criar conta</Link>
        </button>
      </main>
    </>
  )
}

export default App
