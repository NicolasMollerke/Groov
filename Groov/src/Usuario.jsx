import { useParams, useState } from "react-router-dom"

function Usuario() {
    const { usuarioId } = useParams()
    const [ usuario, setUsuario ] = useState([])

    useEffect(() => {
        async function getUsuario() {
            const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioId}`) 
            const usuario2 = await resposta.json()
            setUsuario(usuario2)
        }
        getUsuario()
    }, [])
    
    return(
        <>
           <h1>{usuario.nome}</h1> 
        </>
    )

}

export default Usuario