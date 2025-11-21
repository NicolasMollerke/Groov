import { useEffect, useState } from 'react'
import Header from './components/Header'

import NavBar from "./components/NavBar"
import CardEventoHorinzontal from './components/CardEventoHorinzontal'

function Favoritos() {
  const [usuarios, setUsuarios] = useState([])
  const[eventos, setEventos] = useState([])

  useEffect(() => {
    if (localStorage.getItem("meusFavoritos")) {
      const resposta = JSON.parse(localStorage.getItem("meusFavoritos"))
      setUsuarios(resposta.reverse())
    }

    async function buscarEventos() {
            try{
                const resposta = await fetch("http://localhost:3000/eventos")
                if (!resposta.ok) throw new Error("Erro ao consultar eventos")
                const dados = await resposta.json()
    
                setEventos(dados.reverse())
            } catch (erro) {
                console.log("Erro: ", erro.message)
            } 
        }
        buscarEventos()
  }, [])

  const favoritosSet = new Set((usuarios || []).map(u => String(u).toUpperCase().trim()))
  const listaEventos = eventos
    .filter(evento =>
      evento.organizadores?.some(organizador =>
        favoritosSet.has(String(organizador).toUpperCase().trim())
      )
    )
    .map(evento => (
      <CardEventoHorinzontal key={evento.id} evento={evento} setEventos={setEventos} />
    ))

  return (
    <>
      <Header/>
      <main className='flex flex-col mx-auto justify-center items-start'>
          <h2>Eventos Favoritos</h2>
          {usuarios.length == 0 ?
            <h2>*Obs.: Não há filmes na sua lista de favoritos</h2>
            :
            <section>{listaEventos}</section>
          }
      </main>
      <NavBar/>
    </>
  )
}

export default Favoritos
