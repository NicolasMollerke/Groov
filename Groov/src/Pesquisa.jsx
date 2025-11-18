import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import CardEvento from "./components/Cardevento";

const MODOS_PESQUISA = {
    EVENTO: 'evento',
    ORGANIZADOR: 'organizador',
};

export default function Pesquisa() {
    const [modoFiltro, setModoFiltro] = useState(MODOS_PESQUISA.EVENTO);
    
    const [todosOsEventos, setTodosOsEventos] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarTodosOsEventos() {
            setCarregando(true);
            try {
                const resposta = await fetch("http://localhost:3000/eventos");
                if (!resposta.ok) throw new Error("Erro ao consultar os eventos");
                const dados = await resposta.json();
                const eventosArray = Array.isArray(dados) ? dados : dados.eventos || [];
                setTodosOsEventos(eventosArray);
            } catch (erro) {
                console.error("Erro ao carregar eventos: ", erro.message);
            } finally {
                setCarregando(false);
            }
        }
        carregarTodosOsEventos();
    }, []);

    useEffect(() => {
        const termo = termoPesquisa.toUpperCase().trim();

        if (!termo) {
            setEventosFiltrados([]);
            return;
        }

        const resultados = todosOsEventos.filter(evento => {
            if (modoFiltro === MODOS_PESQUISA.EVENTO) {
                const nomeEvento = evento.nome ? evento.nome.toUpperCase() : '';
                return nomeEvento.includes(termo);
            } else if (modoFiltro === MODOS_PESQUISA.ORGANIZADOR) {
                let organizadoresMatch = false;
                if (Array.isArray(evento.organizadores)) {
                    organizadoresMatch = evento.organizadores.some(org => 
                        org.toUpperCase().includes(termo)
                    );
                } else if (typeof evento.organizadores === 'string') {
                    organizadoresMatch = evento.organizadores.toUpperCase().includes(termo);
                }
                return organizadoresMatch;
            }
            return false;
        });

        setEventosFiltrados(resultados);
    }, [termoPesquisa, todosOsEventos, modoFiltro]); 


    const listaEventos = eventosFiltrados.map(evento => (
        <CardEvento key={evento.id} evento={evento} />
    ));
    
    const placeholderText = modoFiltro === MODOS_PESQUISA.EVENTO 
        ? "Pesquise pelo nome do evento" 
        : "Pesquise pelo nome do organizador";
        
    const modoAtualTexto = modoFiltro === MODOS_PESQUISA.EVENTO ? 'Eventos' : 'Organizadores';


    return (
        <>
            <Header/>
            <main className="w-full">
                <div className="flex justify-center p-4 gap-4">
                    <button 
                        onClick={() => setModoFiltro(MODOS_PESQUISA.ORGANIZADOR)}
                        className={`px-4 py-2 rounded-lg font-bold ${modoFiltro === MODOS_PESQUISA.ORGANIZADOR ? 'bg-roxop text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Organizador
                    </button>
                    <button 
                        onClick={() => setModoFiltro(MODOS_PESQUISA.EVENTO)}
                        className={`px-4 py-2 rounded-lg font-bold ${modoFiltro === MODOS_PESQUISA.EVENTO ? 'bg-roxop text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Eventos
                    </button>
                </div>

                <div className='flex justify-center mx-auto w-full' style={{marginBottom: '20px'}}>
                    <input 
                        type="text" 
                        className='w-[20rem] h-[2rem] text-white text-[15px] text-center rounded-[1.25rem] border-solid border-2 border-roxop' 
                        placeholder={placeholderText} 
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                    />
                </div>
                
                {carregando && <p className="text-center text-white">Carregando dados...</p>}

                {!carregando && termoPesquisa.trim() !== '' && eventosFiltrados.length === 0 && (
                    <p className="text-center justify-center text-white">
                        Não encontramos resultados em **"{modoAtualTexto}"** para a busca: **"{termoPesquisa}"**
                    </p>
                )}


                <section className='grid-filmes'>
                    {listaEventos}
                </section>
                
                <NavBar/>
            </main> 
        </>
    );
}