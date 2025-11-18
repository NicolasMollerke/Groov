import Header from './components/Header'
import { useState, useEffect } from "react"
import CardEventoHorinzontal from "./components/CardEventoHorinzontal"
import Navbar from "./components/NavBar"
import Header_pc from './components/Header_pc'

export default function Shows() {
    const [filmes, setFilmes] = useState([])
    
      const cat_fixa = "Show"
      async function pesquisaFilmes() {
        try {
          const resposta = await fetch("http://localhost:3000/eventos")
          if (!resposta.ok) throw new Error("Erro ao consultar os eventos")
          const dados = await resposta.json()
          const dados2 = dados.filter(eventos => (
            eventos.categoria.toUpperCase().includes(cat_fixa.toUpperCase())))
          if (dados2.length == 0) {
            alert("Não há eventos cadastrados com essa categoria ainda")
          } else {
            setFilmes(dados2)
          }
        } catch (erro) {
          console.log("Erro: ", erro.message)
        }
      }
    
      useEffect(() => {
        pesquisaFilmes();
      }, [])
    
      const listaFilmes = filmes.map(evento => (
        <CardEventoHorinzontal key={evento.id} evento={evento} eventos={evento} />
    
      ))
    
      return (
    <>
    <header>
        < Header />
        < Header_pc />
         </header>
      <h1 className='text-center text-stroke-white text-transparent text-[2rem] uppercase font-black'>Shows</h1>
      <section className='grid-filmes'>
        {listaFilmes}
      </section>
      < Navbar/>
    </>
      )
}
