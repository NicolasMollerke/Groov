import Header from './components/Header'
import { useState, useEffect } from "react"
import CardEvento from "./components/CardEvento"

function Pesquisa() {
  const [filmes, setFilmes] = useState([])

  const cat_fixa = "Universitaria"
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
    <CardEvento key={evento.id} eventos={evento} />
  ))

  return (
    <>
      <Header />
      <h1 style={{ 'margin-top': 0 }}></h1>
      <section className='grid-filmes'>
        {listaFilmes}
      </section>
    </>
  )
}

export default Pesquisa
