import Header from './components/Header'
import { useState, useEffect } from "react"
import CardEventoHorinzontal from "./components/CardEventoHorinzontal"
import Navbar from "./components/NavBar"
import CardEvento from './components/Cardevento'


export default function Universitaria() {
  const [eventos, setEventos] = useState([])

  const cat_fixa = "Universitária"
  async function pesquisaEventos() {
    try {
      const resposta = await fetch("http://localhost:3000/eventos")
      if (!resposta.ok) throw new Error("Erro ao consultar os eventos")
      const dados = await resposta.json()
      const dados2 = dados.filter(eventos => (
        eventos.categoria.toUpperCase().includes(cat_fixa.toUpperCase())))
      if (dados2.length == 0) {
        alert("Não há eventos cadastrados com essa categoria ainda")
      } else {
        setEventos(dados2)
      }
    } catch (erro) {
      console.log("Erro: ", erro.message)
    }
  }

  useEffect(() => {
    pesquisaEventos();
  }, [])

  const listaEventos = eventos.map(evento => (
    <CardEvento key={evento.id} evento={evento} eventos={evento} />
  ))
  const listaEventosPc = eventos.map(evento => (
    <CardEvento key={evento.id} evento={evento} eventos={evento} />
  ))

  return (
    <>
      < Header />
      <main className='flex flex-col items-center mx-auto justify-center'>
        <h1 className='text-center text-stroke-white text-transparent text-[2rem] md:text-8xl uppercase font-black'>Universitárias</h1>
        <section className='flex md:hidden flex-wrap w-full truncate gap-3'>
          {listaEventos}
        </section>
        <section className='md:flex flex-wrap w-full truncate hidden gap-3'>
          {listaEventosPc}
        </section>
      </main>
      < Navbar/>
    </>
  )
}



