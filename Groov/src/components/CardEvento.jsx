import { Link } from "react-router"

export default function CardEvento({evento}) {
    
    const palavras = evento?.palavras_chave || evento?.palavrasChave || []
    const listaPalavrasChave = palavras.map((k, i) => (
      <p key={i} className="text-[0.4375rem] md:text-[0.8750rem] text-white py-[0.06rem] px-[0.3rem] bg-roxop rounded-[0.625rem] border-roxos border-2">
        {k}
      </p>
    ))

    return (
        <>
            <Link to={`/evento/${evento.id}`} className="w-36 md:w-72 flex flex-col md:gap-2">
                <img className="h-[8.24838rem] w-36 md:w-72 md:h-[16.49676rem]" src={evento.imagem}alt=""/>
                <div className="flex flex-col justify-start">
                    <h3 className="text-[1rem] md:text-[2rem] text-white font-semibold truncate">{evento.nome}</h3>
                    <div className="flex gap-[0.2rem] truncate">{listaPalavrasChave}</div>
                    <div className="flex gap-1">
                        <p className="text-[0.5rem] md:text-[1rem] text-white">{`${evento.data},`}</p>
                        <p className="text-[0.5rem] md:text-[1rem] text-white">{`${evento.hora}`}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}