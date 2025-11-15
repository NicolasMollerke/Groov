import React from "react"
import NavBar from "./components/NavBar"
import Header from "./components/Header"
import CardEvento from "./components/Cardevento"
import { useState, useEffect } from "react"

function Pesquisa() {
    const [todosOsEventos, setTodosOsEventos] = useState([])
    const [termoPesquisa, setTermoPesquisa] = useState('')
    const [eventosFiltrados, setEventosFiltrados] = useState([])


    async function carregarTodosOsEventos() {
        try {
            const resposta = await fetch("http://localhost:3000/eventos")
            if (!resposta.ok) throw new Error("Erro ao consultar os eventos")
            const dados = await resposta.json()
            const eventosArray = Array.isArray(dados) ? dados : dados.eventos || []
            
            setTodosOsEventos(eventosArray)

        } catch (erro) {
            console.log("Erro ao carregar eventos: ", erro.message)
        }
    }

    useEffect(() => {
        carregarTodosOsEventos()
    }, [])

    
    useEffect(() => {
        const termo = termoPesquisa.toUpperCase().trim()

        if (!termo) {
            setEventosFiltrados([])
            return
        }

        const resultados = todosOsEventos.filter(evento => {
            const nomeEvento = evento.nome ? evento.nome.toUpperCase() : ''

            const nomeMatch = nomeEvento.includes(termo)

            let organizadoresMatch = false
            
            if (Array.isArray(evento.organizadores)) {
                organizadoresMatch = evento.organizadores.some(org => 
                    org.toUpperCase().includes(termo)
                )
            } else if (typeof evento.organizadores === 'string') {
                organizadoresMatch = evento.organizadores.toUpperCase().includes(termo)
            }

            return nomeMatch || organizadoresMatch
        })

        setEventosFiltrados(resultados)

    }, [termoPesquisa, todosOsEventos]) 


    const listaEventos = eventosFiltrados.map(evento => (
        <CardEvento key={evento.id} evento={evento} />
    ))

    return (
        <>
            <Header/>
            <main className="">
                <div className='flex justify-center mx-auto w-full ml-10' style={{marginBottom: '20px'}}>
                    <input 
                        type="text" 
                        className='w-[20rem] h-[2rem] text-white text-[15px] text-center rounded-[1.25rem] border-solid border-2 border-roxop' 
                        placeholder="Pesquise pelo nome ou pelo organizador"
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                    />
                </div>
                

                {termoPesquisa.trim() !== '' && eventosFiltrados.length === 0 && (
                    <p className="text-center justify-center text-white ml-30 w-[10rem]">
                        Não encontramos eventos para a busca: **"{termoPesquisa}"**
                    </p>
                )}



                <section className='grid-filmes'>
                    {listaEventos}
                </section>
                
                <NavBar/>
            </main> 
        </>
    )
}

export default Pesquisa