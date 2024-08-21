import { consulta } from "../database/conexao.js";

class SelecaoRepository {
  // CRUD
  //insert
  async create(centrais) {
    const sql = "INSERT INTO centrais SET ?;";
    console.log(sql);
    return consulta(sql, centrais, "Não foi possivel cadastrar central..");
  }

  async findOrderHD(error) {
    const sql = "SELECT * FROM centrais;";
    return consulta(sql, "Não foi possivel localizao a lista de centrais...");
  }

  findAll() {
    const sql = "SELECT * FROM centrais ORDER BY empresa;";
    return consulta(sql, "Não foi possivel localizao a lista de centrais...");
  }

  findById(id) {
    const sql = "SELECT * FROM centrais WHERE id=?";
    return consulta(
      sql,
      id,
      "Não foi possivel localizao a lista de centrais..."
    );
  }

  delete(pegandoId) {
    const sql = "DELETE FROM centrais WHERE id=?";
    return consulta(
      sql,
      pegandoId,
      "Não foi possivel deletar a central desejada..."
    );
  }
  update(centrais, pegandoId) {
    const sql = "UPDATE centrais SET ? WHERE id=?;";
    return consulta(
      sql,
      [centrais, pegandoId],
      "Não foi possivel deletar a central desejada..."
    );
  }
}

export default new SelecaoRepository();
