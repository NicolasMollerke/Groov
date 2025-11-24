import NavBar from "./components/NavBar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import { MdAccountCircle } from "react-icons/md";
import { IoTicket } from "react-icons/io5";


function Evento() {
    const { eventoId } = useParams()
    const [evento, setEvento] = useState(null)
    const [menu, setMenu] = useState("info")

    useEffect(() => {
        if (!eventoId) return
        fetch(`http://localhost:3000/eventos/${eventoId}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => setEvento(data))
            .catch(() => setEvento(null))
    }, [eventoId])

    const ingressoArray = evento?.ingresso
        ? (Array.isArray(evento.ingresso) ? evento.ingresso : [evento.ingresso])
        : []

    const listaatracoes = (evento?.atracoes ?? []).map((a, i) => (
        <p
            key={i}
            className="text-roxop font-semibold text-[0.750rem] md:text-[1.5rem]"
        >
            {a}
        </p>
    ))

    return (
        <>
            <Header/>
            <main className="flex flex-col items-center mx-auto justify-center md:gap-3">
                <section className="w-full md:flex md:flex-col md:gap-3">
                    {evento?.imagem?.length ? (
                        <img className="h-56 w-full mx-auto object-cover md:h-112" src={evento.imagem} alt={evento?.nome ?? ""} />
                    ) : null}
                    <h3 className="w-fulltext-lg md:text-4xl text-white font-semibold truncate mt-3">{evento?.nome ?? "-"}</h3>
                    <p className="text-sm md:text-3xl text-roxos  font-semibold mt-2">{evento?.descricao ?? ""}</p>
                </section>

                <section className="w-full mx-auto mt-4 gap-4">
                    <nav>
                        <ul className="flex w-full justify-between text-[0.9rem] md:text-[1.8rem]">
                            <li className={`cursor-pointer ${menu === "info" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("info")} >Informações</li>
                            <li className={`cursor-pointer ${menu === "ingressos" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("ingressos")}>Ingressos</li>
                            <li className={`cursor-pointer ${menu === "organizadores" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("organizadores")}>Organizadores</li>
                        </ul>
                    </nav>
                    {menu === "info" && (
                        <div className="flex flex-col gap-5 p-6 border border-roxop rounded-2xl mt-6">
                            <div className="">
                                <h4 className="text-white font-semibold md:text-[2rem]">Localização</h4>
                                <p className="text-roxop font-semibold text-[0.750rem] md:text-[1.5rem]">{evento?.local ?? "-"}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mt-2 md:text-[2rem]" >Data e Hora</h4>
                                <p className="text-roxop font-semibold text-[0.750rem] md:text-[1.5rem]">{(evento?.data ?? "-") + " • " + (evento?.hora ?? "-")}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mt-2 md:text-[2rem]" >Atrações</h4>
                                {listaatracoes}
                            </div>
                        </div>
                    )}

                    {menu === "ingressos" && (
                        <div className="mt-4">
                            {evento.ingresso.preco !=null ? ingressoArray.map((ing, i) => (
                                <div key={i}  className="flex py-4 justify-between md:justify-center md:gap-32 px-4 md:w-154 border border-roxop rounded-2xl mt-6 w-full">
                                    <IoTicket className="w-16 h-auto text-roxop md:w-32 "/>
                                    <div>
                                        <p className="text-roxop font-semibold text-[2rem]">{ing?.tipo ?? "-"}</p>
                                        <p className="text-roxop font-semibold text-[2rem]">{ing?.lote ?? "-"}</p>
                                        <p className="text-roxop font-semibold text-[2rem]">R${ing?.preco ?? "-"}</p>
                                    </div>
                                </div>
                            )) : <p className="text-white font-semibold md:text-[2rem] text-center">Sem ingressos, o evento é gratuito!</p>}
                        </div>
                    )}

                    {menu === "organizadores" && (
                        <div className="mt-4">
                            {(evento?.organizadores ?? []).length
                                ? (evento.organizadores.map((o, i) => <p className="text-roxop font-semibold text-[0.750rem] md:text-[1.5rem]" key={i}>{o}</p>))
                                : 
                                <div className="flex items-center gap-2">
                                    <MdAccountCircle className="w-10.25 h-auto text-roxop"/>
                                    <p className="text-roxop font-semibold text-[0.750rem] md:text-[1.5rem]">Sem organizadores</p>
                                </div>
                            }
                        </div>
                    )}
                </section>
                <NavBar/>
            </main>
        </>
    )
}

export default Evento
