import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Header from "./components/Header"

function Evento() {
    const { eventoId } = useParams()
    const [evento, setEvento] = useState({})

    useEffect(() => {
        async function getEvento() {
            const response = await fetch(`http://localhost:3000/eventos/${eventoId}`)      
            const evento2 = await response.json()
            setEvento(evento2)
            }
        getEvento()
    }, [])
    
    return(
            <>
                <Header/>
                <main>
                    <section className='flex flex-col items-center mx-auto justify-center'>
                    <img className="h-[8.24838rem] w-full" src={evento.imagem[0]} alt="" />
                    <h3 className="text-[1rem] text-white font-semibold truncate">{evento.nome}</h3>
                    </section>
                </main>

            </>
        )
}

export default Evento