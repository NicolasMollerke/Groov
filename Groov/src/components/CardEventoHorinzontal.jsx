import { Link } from "react-router"

export default function CardEventoHorinzontal({evento}) {
    
    const listaPalavrasChave = []
    if (evento.palavras_chave) {
    for (let i = 0; i < evento.palavras_chave.length; i++) {
      listaPalavrasChave.push(
          <p className="text-[0.4375rem] text-white py-[0.06rem] px-[0.15rem] bg-roxop rounded-[0.625rem] border-roxos border-2">{evento.palavras_chave[i]}</p>
      )
    }
  }

    return (
        <>
            <div to={`/evento/${evento.id}`} className="w-full flex items-end gap-3">
                <Link to={`/evento/${evento.id}`}>< img className="h-[8.24838rem] w-36" src={evento.imagem[0]} alt=""/></Link>
                <div className="flex flex-col justify-start mt-12  ">
                    <h3 className="text-[1rem] text-white font-semibold truncate">{evento.nome}</h3>
                    <div className="flex gap-[0.2rem]">{listaPalavrasChave}</div>
                    <div className="flex gap-1">
                        <p className="text-[0.5rem] text-white">{`${evento.data},`}</p>
                        <p className="text-[0.5rem] text-white">{`${evento.hora}`}</p>
                    </div>
                </div>
            </div>
        </>
    )
}