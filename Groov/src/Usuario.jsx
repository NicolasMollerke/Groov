import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "./components/NavBar"
import CardEvento from "./components/CardEvento"
import Header from './components/Header'
import { CgProfile } from "react-icons/cg";
import { Estrelas } from './components/Estrelas'
import { FaStar, FaRegStar  } from "react-icons/fa";
import Swal from 'sweetalert2'


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

    async function enviarComentario(data) {
        const { nome, comentario, nota } = data

        const usuarioAlterado = {
        ...usuario,
        nomes: [...ususario.nome_usuario, nome],
        comentarios: [...usuario.comentarios, comentario],
        notas: [...usuario.nota, Number(nota)]
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

        // Atualiza lista
        const respostaLista = await fetch("http://localhost:3000/usuarios")
        const dados = await respostaLista.json()
        setFilmes(dados.reverse())
        } catch (erro) {
        console.error("Erro: " + erro.message)
        }
        reset()    // limpa o form
    }

     function avaliarUsuario() {
       Swal.fire({
         title: `Avaliação: ${usuario.nome}`,
         html: `
           <input id="swal-nome" class="swal2-input" placeholder="Seu nome" />
           <input id="swal-comentario" class="swal2-input" placeholder="Comentário" />
           <input id="swal-nota" type="number" class="swal2-input" placeholder="Nota (1 a 5)" min="1" max="5" />
         `,
         showCancelButton: true,
         confirmButtonText: "Enviar",
         preConfirm: () => {
           const nome = document.getElementById("swal-nome").value;
           const comentario = document.getElementById("swal-comentario").value;
           const nota = document.getElementById("swal-nota").value;
           if (!nome || !comentario || !nota) {
             Swal.showValidationMessage("Preencha todos os campos");
             return false;
           }
           return { nome, comentario, nota };
         },
       }).then((result) => {
         if (result.isConfirmed && result.value) {
           enviarComentario(result.value);
         }
       });
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
            <section className="w-full border flex flex-col items-center py-11 gap-3 relative justify-center mx-auto">
                {favoritos.includes(usuario.nome) ? 
                <FaStar onClick={desfavoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 md:w-28 h-auto transition-transform duration-200 ease-in-out text-roxop hover:scale-110' /> :
                <FaRegStar onClick={favoritaOrganizador} className='absolute top-2 right-2 z-10 w-14 md:w-28 h-auto transition-transform duration-200 ease-in-out text-roxop' />
                    }
                {usuario.foto? (<img className="w-32 h-32 md:h-64 md:w-64" src={usuario.foto}/>) : (<CgProfile className="text-9xl md:text-[16rem] text-roxop" />)}
                <h1 className="text-white font-bold text-[1rem] md:text-[2rem]">{usuario.nome}</h1>
                <Estrelas num={calculaMedia()} />
            </section>
            <section className="flex w-full truncate mt-5 md:mt-8 flex-col">
                <h1 className="text-white font-semibold">Eventos realidos por {usuario.nome}</h1>
                <div className="flex gap-3 overflow-x-auto">{listaEventos}</div>
            </section>
            <section>
                <button className='p-3 bg-roxop textwh' onClick={avaliarUsuario}>Avaliar</button>
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