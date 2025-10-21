const fs = require('fs');
const path = require('path');

// Caminhos
const arquivoEntrada = path.join(__dirname, 'lexico.txt');
const arquivoSaida = path.join(__dirname, 'palavras5.txt');

// Função para remover palavras com acento, ç ou caracteres especiais
function isPalavraValida(palavra) {
    // Apenas letras A-Z ou a-z
    return /^[a-zA-Z]{5}$/.test(palavra);
}

fs.readFile(arquivoEntrada, 'utf-8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err.message);
        return;
    }

    // Separar palavras por qualquer espaço ou quebra de linha
    let palavras = data.split(/\s+/);

    // Filtrar palavras válidas e deixar tudo em minúsculo
    let palavrasFiltradas = palavras
        .map(p => p.trim())
        .filter(p => isPalavraValida(p));

    // Remover duplicatas
    palavrasFiltradas = [...new Set(palavrasFiltradas)];

    // Salvar no novo arquivo
    fs.writeFile(arquivoSaida, palavrasFiltradas.join('\n'), (err) => {
        if (err) {
            console.error('Erro ao criar o arquivo de saída:', err.message);
        } else {
            console.log(`Arquivo filtrado criado com ${palavrasFiltradas.length} palavras: ${arquivoSaida}`);
        }
    });
});
