import NavBar from "./components/NavBar"
import Header from "./components/Header"
import CardEvento from "./components/CardEvento"
import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"


function Home() {
   const[eventos, setEventos] = useState([])
   
    useEffect(() => {
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

    const listaEventos = eventos.map( evento => (
        <CardEvento key={evento.id} evento ={evento} setEventos={setEventos}/>
    ))

    return(
            <>
                <Header/>
                <main className='flex flex-col items-center mx-auto justify-center '>
                    <section className="flex flex-wrap justify-between w-full gap-y-1.5">
                        <Link to="/shows">
                        <div className="bg-cover bg-center w-38.5 h-26.25 rounded-[0.1875rem] flex items-center justify-center"
                            style={{ backgroundImage: "url('/img/fundo.png')" }} >
                                <h2 className=" text-center text-stroke-white text-transparent text-[2rem] uppercase font-black">
                                    Shows ao vivo
                                </h2>
                        </div>
                        </Link>
                        <Link to="/festas">
                        <div className="bg-cover bg-center w-38.5 h-26.25 rounded-[0.1875rem] flex items-center justify-center"
                            style={{ backgroundImage: "url('/img/fundo.png')" }} >
                                <h2 className=" text-center text-stroke-white text-transparent text-[2rem] uppercase font-black">
                                    Shows ao vivo
                                </h2>
                        </div>
                        </Link>
                        <Link to="/universitarias">
                        <div className="bg-cover bg-center w-38.5 h-26.25 rounded-[0.1875rem] flex items-center justify-center"
                            style={{ backgroundImage: "url('/img/fundo.png')" }} >
                                <h2 className="px-1 break-all text-center text-stroke-white text-transparent text-[2rem] uppercase font-black">
                                    Universitárias
                                </h2>
                        </div>
                        </Link>
                        <Link to="/bares">
                        <div className="bg-cover bg-center w-38.5 h-26.25 rounded-[0.1875rem] flex items-center justify-center"
                            style={{ backgroundImage: "url('/img/fundo.png')" }} >
                                <h2 className=" text-center text-stroke-white text-transparent text-[2rem] uppercase font-black">
                                    Bares e Pubs
                                </h2>
                        </div>
                        </Link>
                    </section>
                    <section>
                        <h2></h2>
                        {listaEventos}
                    </section>
                    <NavBar/>
                </main>
            </>
        )
}

export default Home