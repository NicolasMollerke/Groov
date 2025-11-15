import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";


function InclusaoEvento() {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            tipo: "shows",
            nome: "",
            categoria: "shows",
            imagem: "",
            descricao: "",
            data: "",
            hora: "",
            local: "",
            atracoes: "",
            organizadores: "",
            palavrasChave: []
        }
    });

    const KEYWORDS = [
        "Eletrônica", "Funk", "Hip Hop", "Trap", "Pop", "Sertanejo", "Pagode", "Samba", "Rock", "Indie", "Reggaeton", "MPB",
        "Barzinho", "Pub", "Balada", "Lounge", "Boteco", "Rooftop", "Karaokê", "Clube Noturno", "Beach Club", "House Party",
        "Clima Romântico", "Good Vibes", "Alta Energia", "Relax", "Chill", "Open Bar", "Open Food", "After", "Pré-night",
        "Universitário", "LGBTQ+ Friendly", "Mais Adulto (25+)", "Turístico", "Alternativo", "Casual", "Luxuoso",
        "DJ ao vivo", "Banda ao vivo", "Música ao vivo", "Mesa de Sinuca", "Beer Pong", "Stand-up", "Jogos", "Áreas externas", "Pet Friendly",
        "Drinks Artesanais", "Cerveja Artesanal", "Cerveja Barata", "Wine Bar", "Chopp Gelado", "Destilados",
        "Comida de Bar", "Petiscos", "Food Trucks",
        "Centro", "Praia", "Eventos Especiais", "Rolês Temáticos", "Festivais", "Shows"
    ];

    // state to toggle visibility of the keyword picker
    const [showKeywords, setShowKeywords] = useState(false);
    const keywordsRef = useRef(null);

    useEffect(() => {
        if (showKeywords) {
            // focus the first keyword button for accessibility
            const firstBtn = keywordsRef.current?.querySelector("button");
            firstBtn?.focus();
        }
    }, [showKeywords]);


    const onSubmit = async (data) => {
        const payload = {
            ...data,
            atracoes: data.atracoes.split(",").map(a => a.trim()),
            organizadores: data.organizadores.split(",").map(a => a.trim()),
            palavrasChave: data.palavrasChave,

            ingresso: {
                preco: parseFloat(data.ingressoPreco),
                lote: data.ingressoLote,
                tipo: data.ingressoTipo
            }
        };


        try {
            const response = await fetch("http://localhost:3000/eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const result = await response.json();
            console.log("Resposta da API:", result);

            alert("Evento criado com sucesso!");
            reset();

        } catch (error) {
            console.error("Erro ao enviar evento:", error);
            alert("Falha ao criar o evento.");
        }
    };

    const limparForm = () => {
        reset();
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Criar Novo Evento</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="text-white space-y-4 max-w-2xl">

                {/* Campo Nome */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nome do Evento *</label>
                    <input
                        type="text"
                        placeholder="Nome do evento"
                        {...register("nome", {
                            required: "Nome é obrigatório"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                </div>

                {/* Campo Categoria */}
                <div>
                    <label className="block text-sm font-medium mb-1">Categoria *</label>
                    <select
                        {...register("categoria", {
                            required: "Categoria é obrigatória"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="shows">Shows</option>
                        <option value="festas">Festas</option>
                        <option value="bares">Bares</option>
                        <option value="universitarias">Universitárias</option>
                    </select>
                    {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria.message}</span>}
                </div>

                {/* Campo Imagem */}
                <div>
                    <label className="block text-sm font-medium mb-1">Imagem do Evento *</label>
                    <input
                        type="url"
                        placeholder="https://link-da-imagem.com"
                        {...register("imagem", {
                            required: "Imagem é obrigatória"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.imagem && (
                        <span className="text-red-500 text-sm">{errors.imagem.message}</span>
                    )}
                </div>


                {/* Campo Descrição */}
                <div>
                    <label className="block text-sm font-medium mb-1">Descrição *</label>
                    <textarea
                        placeholder="Descreva o evento..."
                        rows="4"
                        {...register("descricao", {
                            required: "Descrição é obrigatória"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                </div>

                {/* Campo Data */}
                <div>
                    <label className="block text-sm font-medium mb-1">Data *</label>
                    <input
                        type="date"
                        {...register("data", {
                            required: "Data é obrigatória"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.data && <span className="text-red-500 text-sm">{errors.data.message}</span>}
                </div>

                {/* Campo Hora */}
                <div>
                    <label className="block text-sm font-medium mb-1">Hora *</label>
                    <input
                        type="time"
                        {...register("hora", {
                            required: "Hora é obrigatória"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.hora && <span className="text-red-500 text-sm">{errors.hora.message}</span>}
                </div>

                {/* Campo Local */}
                <div>
                    <label className="block text-sm font-medium mb-1">Local *</label>
                    <input
                        type="text"
                        placeholder="Endereço do evento"
                        {...register("local", {
                            required: "Local é obrigatório"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.local && <span className="text-red-500 text-sm">{errors.local.message}</span>}
                </div>

                {/* Campo Atrações */}
                <div>
                    <label className="block text-sm font-medium mb-1">Atrações *</label>
                    <textarea
                        placeholder="Liste as atrações (bandas, DJs, artistas, etc.)"
                        rows="3"
                        {...register("atracoes", {
                            required: "Atrações é obrigatório"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.atracoes && <span className="text-red-500 text-sm">{errors.atracoes.message}</span>}
                </div>

                {/* Campo Organizadores */}
                <div>
                    <label className="block text-sm font-medium mb-1">Organizadores *</label>
                    <textarea
                        placeholder="Nomes dos organizadores/produtoras"
                        rows="3"
                        {...register("organizadores", {
                            required: "Organizadores é obrigatório"
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.organizadores && <span className="text-red-500 text-sm">{errors.organizadores.message}</span>}
                </div>

                {/* Campo Palavras-chave */}
                <div>
                    <label className="block text-sm font-medium mb-1">Palavras-chave *</label>

                    <button
                        type="button"
                        aria-expanded={showKeywords}
                        aria-controls="keywords-panel"
                        onClick={() => setShowKeywords(v => !v)}
                        className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md"
                    >
                        {showKeywords ? "Ocultar palavras-chave" : "Selecionar palavras-chave"}
                    </button>

                    {showKeywords && (
                        <div id="keywords-panel" ref={keywordsRef} className="mt-3">
                            <Controller
                                name="palavrasChave"
                                control={control}
                                defaultValue={[]}
                                rules={{ required: "Selecione pelo menos uma palavra-chave" }}
                                render={({ field }) => {
                                    const { value, onChange } = field;

                                    const toggle = (keyword) => {
                                        const exists = value.includes(keyword);
                                        const updated = exists
                                            ? value.filter(k => k !== keyword)
                                            : [...value, keyword];
                                        onChange(updated);
                                    };

                                    return (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {KEYWORDS.map((kw) => {
                                                const selected = value.includes(kw);
                                                return (
                                                    <button
                                                        key={kw}
                                                        type="button"
                                                        onClick={() => toggle(kw)}
                                                        className={`px-3 py-2 rounded-full text-sm border transition ${selected ? "bg-white text-black border-white font-semibold" : "border-gray-500 text-gray-300"}`}
                                                    >
                                                        {kw}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    )}

                    {errors.palavrasChave && (
                        <span className="text-red-500 text-sm">{errors.palavrasChave.message}</span>
                    )}
                </div>

                <div className="mt-8 p-4 border border-gray-600 rounded-lg bg-gray-900">
                    <h2 className="text-xl font-semibold mb-4 text-white">Informações do Ingresso</h2>

                    {/* Tipo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Tipo de Ingresso *</label>
                        <input
                            type="text"
                            placeholder="Pista, VIP, Mesanino..."
                            {...register("ingressoTipo", {
                                required: "O tipo é obrigatório"
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.ingressoTipo && (
                            <span className="text-red-500 text-sm">{errors.ingressoTipo.message}</span>
                        )}
                    </div>

                    {/* Lote */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Lote *</label>
                        <input
                            type="text"
                            placeholder="1º lote, 2º lote..."
                            {...register("ingressoLote", {
                                required: "O lote é obrigatório"
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.ingressoLote && (
                            <span className="text-red-500 text-sm">{errors.ingressoLote.message}</span>
                        )}
                    </div>

                    {/* Preço */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">Preço (R$) *</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Preço do ingresso"
                            {...register("ingressoPreco", {
                                required: "O preço é obrigatório",
                                min: { value: 0, message: "O preço não pode ser negativo" }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.ingressoPreco && (
                            <span className="text-red-500 text-sm">{errors.ingressoPreco.message}</span>
                        )}
                    </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
                    >
                        Criar Evento
                    </button>
                    <button
                        type="button"
                        onClick={limparForm}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition"
                    >
                        Limpar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InclusaoEvento;