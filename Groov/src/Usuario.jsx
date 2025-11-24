import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "./components/NavBar"
import CardEvento from "./components/CardEvento"
import Header from './components/Header'
import { CgProfile } from "react-icons/cg";
import { Estrelas } from './components/Estrelas'
import { FaStar, FaRegStar  } from "react-icons/fa";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content"
import { useForm } from "react-hook-form"

const MySwal = withReactContent(Swal)

function Usuario() {
    const { usuarioId } = useParams()
    const [ usuario, setUsuario ] = useState({ nome_usuario: [], comentarios: [], nota: [] })
    const [favoritos, setFavoritos] = useState([])
    const[eventos, setEventos] = useState([])
    const { register, handleSubmit, reset } = useForm()

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

        if (localStorage.getItem("meusFavoritos")) {
        try {
            const favoritosSalvos = JSON.parse(localStorage.getItem("meusFavoritos"));
            setFavoritos(favoritosSalvos);
        } catch (e) {
            console.error("Erro ao carregar favoritos do localStorage:", e);
            setFavoritos([]); // Reseta se houver erro no parsing
        }
    }
    }, [])

    async function enviarComentario(data) {
        const { nome, comentario, nota } = data

        const usuarioAlterado = {
            ...usuario,
            // Usamos || [] aqui, o que é crucial, para garantir que nunca seja undefined.
            nome_usuario: [...(usuario.nome_usuario || []), nome], 
            comentarios: [...(usuario.comentarios || []), comentario],
            nota: [...(usuario.nota || []), Number(nota)]
        }

        try {
            const resposta = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioAlterado),
            })
            
            if (!resposta.ok) throw new Error("Erro ao incluir avaliação do usuario...")

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `<span style="font-family: 'Arial'">Ok! Avaliação cadastrada com sucesso</span>`,
                showConfirmButton: false,
                timer: 2000,
            })

            // *** AQUI ESTÁ A CHAVE DA CORREÇÃO: ATUALIZAÇÃO LOCAL ***
            // Definimos o estado 'usuario' com o objeto atualizado.
            setUsuario(usuarioAlterado)
            
            // As linhas de busca de lista foram removidas!
            
        } catch (erro) {
            console.error("Erro: " + erro.message)
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `Erro ao enviar comentário: ${erro.message}`,
            })
        }
        reset() 
    }

     function avaliarUsuario() {
        MySwal.fire({
        title: <span style={{ fontFamily: "Arial" }}>Avaliação: {usuario.nome}</span>,
        html: (
            <form onSubmit={handleSubmit(enviarComentario)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
            <input type="text" placeholder="Seu nome"
                className="swal2-input" style={{ width: 300 }}
                required
                {...register("nome")}
            />
            <input type="text" placeholder="Comentário"
                className="swal2-input" style={{ width: 300 }}
                required
                {...register("comentario")}
            />
            <input type="number" placeholder="Nota (1 a 5)"
                className="swal2-input" style={{ width: 300 }}
                min="1" max="5" required
                {...register("nota")}
            />
            <button type="submit" className="swal2-confirm swal2-styled" style={{ marginTop: "20px" }}>
                Enviar
            </button>
            </form>
        ),
        showConfirmButton: false,
        })
     }
        
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
        const favoritos2 = [...favoritos, usuario.nome]
        setFavoritos(favoritos2)
        localStorage.setItem("meusFavoritos", JSON.stringify(favoritos2))
    }

    function desfavoritaOrganizador() {
        const favoritos2 = favoritos.filter(item => item != usuario.nome)
        setFavoritos(favoritos2)
        localStorage.setItem("meusFavoritos", JSON.stringify(favoritos2))
    }
    
    const listaComentarios = []
        if (usuario.comentarios) {
            for (let i = 0; i < usuario.comentarios.length; i++) {
            listaComentarios.push(
                <div className="flex gap-8 items-center md:gap-16">
                    <div className="flex-col flex items-center w-2.5 gap-1">
                        <CgProfile className="text-4xl text-roxop"/>
                        <h3 className="text-white text-[0.5rem] text-center md:text-[1rem]">{usuario.nome_usuario[i]}</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-3">
                        <Estrelas className="text-start text-[0.7rem]" num={usuario.nota[i]} />
                        <p className="text-white text-[0.6rem] w-full px-2 py-4 text-start border border-white rounded-lg md:text-[1.2rem] md:px-4 md:py-8">{usuario.comentarios[i]}</p>
                    </div>
                </div>
            )
            }
    }
    return(
        <>
           < Header />
           <main className='flex flex-col items-center mx-auto justify-center'>
            <section className="w-full flex flex-col items-center py-11 gap-3 relative justify-center mx-auto">
                {favoritos.includes(usuario.nome) ? 
                <FaStar onClick={desfavoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 md:w-28 h-auto transition-transform duration-200 ease-in-out text-roxop hover:scale-110' /> :
                <FaRegStar onClick={favoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 md:w-28 h-auto transition-transform duration-200 ease-in-out text-roxop' />
                    }
                {usuario.foto? (<img className="w-32 h-32 md:h-64 md:w-64" src={usuario.foto}/>) : (<CgProfile className="text-9xl md:text-[16rem] text-roxop" />)}
                <h1 className="text-white font-bold text-[1rem] md:text-[2rem]">{usuario.nome}</h1>
                <Estrelas num={calculaMedia()} />
            </section>
            <section className="flex w-full truncate mt-5 md:mt-8 flex-col">
                <h1 className="text-white font-semibold md:text-[3rem]">Eventos realizados por {usuario.nome}</h1>
                <div className="flex gap-3 overflow-x-auto">{listaEventos}</div>
            </section>
            <section className="mt-6 rounded-lg">
                <button className='p-3 bg-roxop rounded-2xl text-white md:text-[1.5rem] md:p-5' onClick={avaliarUsuario}>Avaliar</button>
            </section>
            <section className="flex flex-col w-full gap-6 mt-6">
                {listaComentarios}
            </section>
           </main>
           <NavBar/>
        </>
    )

}

export default Usuario