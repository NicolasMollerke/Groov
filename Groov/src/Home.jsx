import NavBar from "./components/NavBar"
import Header from "./components/Header"
import CardEvento from "./components/CardEvento"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


function Home() {
    const [eventos, setEventos] = useState([])
    const [eventosG, setEventosG] = useState([])

    useEffect(() => {
        async function buscarEventos() {
            try {
                const resposta = await fetch("http://localhost:3000/eventos")
                if (!resposta.ok) throw new Error("Erro ao consultar eventos")
                const dados = await resposta.json()
                const dadosG = dados.filter(ev =>
                    ev.palavras_chave?.some(
                        k => String(k).toLowerCase().trim() === "gratuito"
                    )
                )
                setEventosG(dadosG)

                setEventos(dados.reverse())
            } catch (erro) {
                console.log("Erro: ", erro.message)
            }
        }
        buscarEventos()
    }, [])

    const listaEventos = eventos.map(evento => (
        <CardEvento key={evento.id} evento={evento} setEventos={setEventos} />
    ))

    const listaEventosG = eventosG.map(evento => (
        <CardEvento key={evento.id} evento={evento} setEventosG={setEventosG} />
    ))

    return (
        <>
            <Header />
            <main className='flex flex-col items-center mx-auto justify-center md:gap-20'>
                <section className="flex flex-wrap justify-between w-full gap-y-3 mb-10">
                    <Link to="/shows">
                        <div className="bg-linear-to-br from-[#6b4ce6] to-[#3a2b80] 
                        w-38 h-32 rounded-[0.1875rem] flex items-center justify-center md:w-80 md:h-60">
                            <h2 className=" text-center text-stroke-white text-transparent text-[2rem] md:text-6xl uppercase font-black">
                                Shows ao vivo
                            </h2>
                        </div>
                    </Link>
                    <Link to="/festas">
                        <div className="bg-linear-to-br from-[#6b4ce6] to-[#3a2b80] 
                         w-38 h-32 rounded-[0.1875rem] flex items-center justify-center md:w-80 md:h-60">
                            <h2 className=" text-center text-stroke-white text-transparent text-[2rem] md:text-6xl uppercase font-black">
                                Festas
                            </h2>
                        </div>
                        </Link>
                        <Link to="/universitarias">
                        <div className="bg-linear-to-br from-[#6b4ce6] to-[#3a2b80] 
                        w-38 h-32 rounded-[0.1875rem] flex items-center justify-center md:w-80 md:h-60">
                                <h2 className="px-1 break-all text-center text-stroke-white text-transparent text-[2rem] md:text-6xl uppercase font-black">
                                    Universitárias
                                </h2>
                        </div>
                        </Link>
                        <Link to="/bares">
                        <div className="bg-linear-to-br from-[#6b4ce6] to-[#3a2b80] 
                        w-38 h-32 rounded-[0.1875rem] flex items-center justify-center md:w-80 md:h-60">
                                <h2 className=" text-center text-stroke-white text-transparent text-[2rem] md:text-6xl uppercase font-black">
                                    Bares e Pubs
                                </h2>
                        </div>
                        </Link>
                    </section>
                    <NavBar/>
                    <section className="flex flex-col items-start w-full mt-5 md:mt-8 ">
                        <h2 className=" text-white font-semibold md:text-[3rem]">Reocomendados</h2>
                        <div className="flex w-full items-center truncate">
                            <div className="w-full flex gap-3 overflow-x-auto">{listaEventos}</div>
                        </div>
                    </section>
                    <section className="flex flex-col items-start w-full mt-5 md:mt-8 ">
                        <h2 className=" text-white font-semibold md:text-[3rem]">Eventos Gratuitos</h2>
                        <div className="flex w-full items-center">
                            <div className="flex gap-3 ">{listaEventosG}</div>
                        </div>
                </section>
                <NavBar />
            </main>
        </>
    )
}

export default Home