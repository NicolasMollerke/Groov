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

    return (
        <>
            <Header/>
            <main className="flex flex-col items-center mx-auto justify-center">
                <section className="w-full">
                    {evento?.imagem?.length ? (
                        <img className="h-56 max-w-full mx-auto object-cover" src={evento.imagem[0]} alt={evento?.nome ?? ""} />
                    ) : null}
                    <h3 className="w-fulltext-lg text-white font-semibold truncate mt-3">{evento?.nome ?? "-"}</h3>
                    <p className="text-sm text-roxos  font-semibold mt-2">{evento?.descricao ?? ""}</p>
                </section>

                <section className="w-full mx-auto mt-4 gap-4">
                    <nav>
                        <ul className="flex w-full justify-between text-[0.9rem]">
                            <li className={`cursor-pointer ${menu === "info" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("info")} >Informações</li>
                            <li className={`cursor-pointer ${menu === "ingressos" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("ingressos")}>Ingressos</li>
                            <li className={`cursor-pointer ${menu === "organizadores" ? "font-bold text-roxop" : "text-white"}`} onClick={() => setMenu("organizadores")}>Organizadores</li>
                        </ul>
                    </nav>
                    {menu === "info" && (
                        <div className="flex flex-col gap-5 p-6 border border-roxop rounded-2xl mt-6">
                            <div className="">
                                <h4 className="text-white font-semibold">Localização</h4>
                                <p className="text-roxop font-semibold text-[0.750rem]">{evento?.local ?? "-"}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mt-2">Data e Hora</h4>
                                <p className="text-roxop font-semibold text-[0.750rem]">{(evento?.data ?? "-") + " • " + (evento?.hora ?? "-")}</p>
                            </div>
                        </div>
                    )}

                    {menu === "ingressos" && (
                        <div className="mt-4">
                            {ingressoArray.length ? ingressoArray.map((ing, i) => (
                                <div key={i}  className="flex gap-5 py-4 justify-between px-4 border border-roxop rounded-2xl mt-6 w-full">
                                    <IoTicket className="w-16 h-auto text-roxop"/>
                                    <div>
                                        <p className="text-roxop font-semibold">{ing?.tipo ?? "-"}</p>
                                        <p className="text-roxop font-semibold">{ing?.lote ?? "-"}</p>
                                        <p className="text-roxop font-semibold">R${ing?.preco ?? "-"}</p>
                                    </div>
                                </div>
                            )) : <p>Sem ingressos</p>}
                        </div>
                    )}

                    {menu === "organizadores" && (
                        <div className="mt-4">
                            {(evento?.organizadores ?? []).length
                                ? (evento.organizadores.map((o, i) => <p key={i}>{o}</p>))
                                : 
                                <div className="flex items-center gap-2">
                                    <MdAccountCircle className="w-10.25 h-auto text-roxop"/>
                                    <p>Sem organizadores</p>
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
