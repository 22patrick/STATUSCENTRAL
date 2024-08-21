import SelecaoRepository from "../repositories/SelecaoRepository.js";

class SelecaoController {
  // --------------------------- select por ordem tamanho hd
  async indexStatusHd(req, res) {
    const resultado = await SelecaoRepository.findOrderHD();
    //Organizando por espaço usado em disco
    resultado.sort((a, b) => {
      const nameA = a.usado;
      const nameB = b.usado;

      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });

    res.json(resultado);
  }
  // --------------------------- select todos os cadastro
  async selectPorIp(req, res) {
    const resultado = await SelecaoRepository.findAll();
    res.json(resultado);
  }

  // --------------------------- select todos os cadastro
  async select(req, res) {
    const resultado = await SelecaoRepository.findAll();
    res.json(resultado);
  }
  // --------------------------- select por ID
  async selectpoiId(req, res) {
    const pegandoId = req.params.id; //pega o parametro id
    const resultado = await SelecaoRepository.findById(pegandoId);
    res.json(resultado);
  }
  // --------------------------- Insert centrais / cadastrar centrais
  async insert(req, res) {
    const centrais = req.body; // pega informação do corpo body
    const resultado = await SelecaoRepository.create(centrais);
    res.json(resultado);
  }
  // --------------------------- deletar centrais
  async delete(req, res) {
    const pegandoId = req.params.id; //pega o parametro id
    const resultado = await SelecaoRepository.delete(pegandoId);
    console.log(resultado.affectedRows);
    res.json(resultado.affectedRows);
  }
  // --------------------------- atualizando centrais
  async update(req, res) {
    const pegandoId = req.params.id;
    const centrais = req.body; // pega informação do corpo body
    const resultado = await SelecaoRepository.update(centrais, pegandoId);
    res.json(resultado);
  }
}
// padrão Singleton
export default new SelecaoController();
