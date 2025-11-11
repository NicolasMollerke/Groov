export default function CardEvento({evento}) {
    
    const listaPalavrasChave = []
    if (evento.palavras_chave) {
    for (let i = 0; i < evento.palavras_chave.length; i++) {
      listaPalavrasChave.push(
        <div key={evento.palavras_chave[i]} className="flex gap-3">
          <td className="w-40 text-center">{evento.palavras_chave[i]}</td>
        </div>
      )
    }
  }

    return (
        <>
            <div>
                <img className="h-9" src={evento.imagem[0]} alt="" />
                <div>
                    <h3 className="text-[1rem] text-white font-semibold">{evento.nome}</h3>
                    {listaPalavrasChave}
                    <div>
                        <p>{evento.local}</p>
                        <p>{evento.hora}</p>
                    </div>
                </div>
            </div>
        </>
    )
}