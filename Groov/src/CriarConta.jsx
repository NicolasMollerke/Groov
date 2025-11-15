import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./components/Header";

function CriarConta() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            nome: "",
            email: ""
        }
    });

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        delete data.senha;
        setServerError("");
        setSuccessMessage("");
        setSubmitting(true);

        try {
            // data NÃO TEM senha
            const res = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data), // só nome e email
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`HTTP ${res.status}: ${txt}`);
            }

            setSuccessMessage("Conta criada com sucesso!");
            reset();

        } catch (err) {
            console.error(err);
            setServerError("Erro ao criar conta.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 text-white">
                <h1 className="text-3xl font-bold mb-6 text-purple-400">Criar Conta</h1>

                {serverError && <p className="text-red-400">{serverError}</p>}
                {successMessage && <p className="text-green-400">{successMessage}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nome *</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            {...register("nome", { required: "Nome é obrigatório" })}
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md"
                        />
                        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <input
                            type="email"
                            placeholder="seu@exemplo.com"
                            {...register("email", { required: "Email é obrigatório" })}
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Campo senha agora é só visual, sem register */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Senha *</label>
                        <input
                            type="password"
                            placeholder="Sua senha (não será enviada)"
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition"
                        >
                            {submitting ? "Enviando..." : "Criar Conta"}
                        </button>

                        <button
                            type="button"
                            onClick={() => reset()}
                            className="flex-1 bg-gray-600 py-2 rounded-md hover:bg-gray-500 transition"
                        >
                            Limpar
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default CriarConta;