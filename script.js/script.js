async function buscarCEP() {

    const campoCEP = document.getElementById("cep");
    const cep = campoCEP.value.replace(/\D/g, "");

    const mensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado");

    // Verifica se o CEP possui 8 números
    if (cep.length !== 8) {

        mensagem.textContent = "Digite um CEP válido.";

        resultado.style.display = "none";

        return;
    }

    mensagem.textContent = "Consultando...";

    try {

        const resposta = await fetch(
            `https://brasilapi.com.br/api/cep/v2/${cep}`
        );

        if (!resposta.ok) {
            throw new Error("CEP não encontrado");
        }

        const dados = await resposta.json();

        document.getElementById("resultadoCep").textContent =
            dados.cep || "Não informado";

        document.getElementById("rua").textContent =
            dados.street || "Não informado";

        document.getElementById("bairro").textContent =
            dados.neighborhood || "Não informado";

        document.getElementById("cidade").textContent =
            dados.city || "Não informado";

        document.getElementById("estado").textContent =
            dados.state || "Não informado";

        mensagem.textContent = "";

        resultado.style.display = "block";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível encontrar esse CEP.";

        resultado.style.display = "none";

        console.error(erro);
    }
}