import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "./components/NavBar"
import CardEvento from "./components/CardEvento"
import Header from './components/Header'
import { CgProfile } from "react-icons/cg";
import { Estrelas } from './components/Estrelas'
import { FaStar, FaRegStar  } from "react-icons/fa";



function Usuario() {
    const { usuarioId } = useParams()
    const [ usuario, setUsuario ] = useState({ nota: [] })
    const [favoritos, setFavoritos] = useState([])
    const[eventos, setEventos] = useState([])
    

    useEffect(() => {
        async function getUsuario() {
            const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioId}`) 
            const usuario2 = await resposta.json()
            setUsuario(usuario2)
        }
        getUsuario()
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


        
    const Username = usuario?.nome?.toUpperCase().trim();
    
    const listaEventos = eventos.filter(evento => {
        return evento.organizadores.some(organizador => {
            return organizador?.toUpperCase().trim() == Username
        })
    }).map(evento => (
        <CardEvento key={evento.id} evento={evento} setEventos={setEventos} />
    ))
    

    function calculaMedia() {
        let soma = 0
        for (const nota of usuario.nota) {
        soma = soma + nota
        }
        return soma / usuario.nota.length
    } 

    function favoritaOrganizador() {
        const favoritos2 = [...favoritos, usuario.id]
        setFavoritos(favoritos2)
        localStorage.setItem("meusFavoritos", JSON.stringify(favoritos2))
    }

    function desfavoritaOrganizador() {
        const favoritos2 = favoritos.filter(item => item != usuario.id)
        setFavoritos(favoritos2)
        localStorage.setItem("meusFavoritos", JSON.stringify(favoritos2))
    }
    
    return(
        <>
           < Header />
           <main className='flex flex-col items-center mx-auto justify-center'>
            <section className="w-full border flex flex-col items-center py-11 gap-3 relative">
                {favoritos.includes(usuario.id) ? 
                <FaStar onClick={desfavoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 h-auto transition-transform duration-200 ease-in-out text-roxop hover:scale-110' /> :
                <FaRegStar onClick={favoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 h-auto transition-transform duration-200 ease-in-out text-roxop' />
          }
                {usuario.foto? (<img src={usuario.foto}/>) : (<CgProfile className="text-9xl text-roxop" />)}
                <h1 className="text-white font-bold text-[1rem]">{usuario.nome}</h1>
                <Estrelas num={calculaMedia()} />
            </section>
            <section>
                {listaEventos}
            </section>
           </main>
        </>
    )

}

export default Usuario