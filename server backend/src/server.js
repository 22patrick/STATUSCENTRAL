import app from "./app.js";

const PORT = 3000;

// escuta a porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});

//--------------------- arquitetura da api ----------------------------

// server.js => {roda a porta 3000} = chamando app.js => routes.js => selecaoController.js => SelecaoRepository.js => conexao.js
