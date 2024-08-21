import mysql from "mysql";

// const conexao = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "invi.5040",
//   database: "centraisstatus",
// });

const conexao = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "invi.5040",
  database: "centraisstatus",
}); 

conexao.getConnection(function (err) {
  if (err) {
    console.log('\x1b[1;31mErro ao conectar ao Mysql \x1b[0m');
    // console.log('Error!'.underline.red);
    setTimeout(tentarNovamente, 10000); // se der erro chama a função tentarNovamente() para nova conexão MYSQL
  } else {
    console.log('\x1b[0;32mConexão com Mysql OK \x1b[0m');
  }
});

function tentarNovamente() {
  conexao.getConnection(function (err) {
    if (err) {
      setTimeout(tentarNovamente, 10000);
      console.log('\x1b[1;31mErro ao conectar ao Mysql \x1b[0m');
    } else {
      console.log('\x1b[0;32mConexão com Mysql OK \x1b[0m');
    }
  });
}

// console.log(conexao.data.connect);

/**  JSDOC
 * Executa um codigo sql com ou sem valores
 * @param {string} sql comando que vai ser executado exp select * from ....
 * @param {string=id | [centrais, id]} valores valores a serem passado para o mysql
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promisse
 */

export const consulta = (sql, valores = "", mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (erro, resultado) => {
      if (erro) {
        return reject(mensagemReject);
      }
      const resul = JSON.parse(JSON.stringify(resultado));
      return resolve(resul);
    });
  });
};

export default conexao;
