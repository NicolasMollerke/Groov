import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Header from "./components/Header"

function Evento() {
    const { eventoId } = useParams()

    const [evento, setEvento] = useState({})
    const [usuarios, setUsuarios] = useState([])
    
     useEffect(() => {
        if (!eventoId) return
        async function getEvento() {
            try {
                const response = await fetch(`http://localhost:3000/eventos/${eventoId}`)
                if (!response.ok) throw new Error(response.status)
                const evento2 = await response.json()
                setEvento(evento2)
            } catch (e) {
                console.error(e)
                setEvento({})
            }
            fetch("http://localhost:3000/usuarios")
            .then(res => res.ok ? res.json() : [])
            .then(setUsuarios)
            .catch(() => setUsuarios([]))
        }
        getEvento()
    }, [eventoId])
    
    const info = <>   
           <div>
                <h3>Localização</h3>
                <p>{evento.local}</p>
            </div>
            <div>
                <h3>Data e Hora</h3>
                <p>{evento.data} - {evento.hora}</p>
            </div>

        </>

        const listaOrganizadores = []
            if (evento.organizadores) {
                for (let i = 0; i < evento.organizadores.length; i++) {
                    const nomeOrg = evento.organizadores[i]
                    const usuario = usuarios.find(u => u.nome === nomeOrg)
                    listaOrganizadores.push(
                        <Link to={`/perfilOrganizador/${usuario.id}`} className="text-[2.4375rem] text-white font-bold">{evento.organizadores[i]}</Link>
                    )
                }
        }

        const organizadores = <>
            <div>
                <h3>Organizadores</h3>
                {listaOrganizadores}
            </div>
        </>
       
        const listaIngressos = []
            if (evento.ingresso) {
                if (Array.isArray(evento.ingresso)) {
                    for (let i = 0; i < evento.ingresso.length; i++) {
                        const ing = evento.ingresso[i]
                        listaIngressos.push(
                            <div key={i} className="mb-2 p-2 border rounded">
                                <p>Tipo: {ing.tipo ?? "-"}</p>
                                <p>Lote: {ing.lote ?? "-"}</p>
                                <p>Preço: {typeof ing.preco === "number" ? ing.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : (ing.preco ?? "-")}</p>
                            </div>
                        )
                    }
                } else {
                    const ing = evento.ingresso
                    listaIngressos.push(
                        <div key="single" className="mb-2 p-2 border rounded">
                            <p>Tipo: {ing.tipo ?? "-"}</p>
                            <p>Lote: {ing.lote ?? "-"}</p>
                            <p>Preço: {typeof ing.preco === "number" ? ing.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : (ing.preco ?? "-")}</p>
                        </div>
                    )
                }
            } else {
                <p>Esse evento é gratuito e não precisa de ingresso.</p>
            }
        
        const ingressos = <>
            <div>
                {listaIngressos}
            </div>
        </>
        const [ menu, setMenu ] = useState (info)
    
    return(
            <>
                <Header/>
                <main className="flex flex-col items-center mx-auto justify-center ">
                    <section className='flex flex-col items-start w-full mx-auto'>
                    {evento?.imagem?.length ? (
                        <img className="h-56 w-full object-cover" src={evento.imagem[0]} alt={evento.nome || ""} />
                    ) : null}
                    <h3 className="text-[1rem] text-white font-semibold truncate">{evento.nome}</h3>
                    <p className="text-[0.655rem] text-roxos font-normal">{evento.descricao}</p>
                    </section>
                    <section className="w-full">
                        <nav className="w-full">
                            <ul className="flex w-full justify-between">
                                <li className="text-[0.755rem]" onClick={() => setMenu(info)}>Informações</li>
                                <li className="text-[0.755rem]" onClick={() => setMenu(ingressos)}>Ingressos</li>
                                <li className="text-[0.755rem]" onClick={() => setMenu(organizadores)}>Organizadores</li>
                            </ul>
                        </nav>
                        {menu}
                    </section>
                </main>

            </>
        )
}

export default Evento