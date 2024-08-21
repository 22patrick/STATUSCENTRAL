import { Router, text } from "express";
import selecaoController from "./app/controllers/selecaoController.js";
import axios from "axios";
import conexao from "./app/database/conexao.js";
import nodemailer from "nodemailer";
const router = Router();
// TS
import rdp from "node-rdp";

var treta = [];
global.treta = treta;

var email;
global.email = email;

var horario = new Date();
global.horario = horario;
// ------------------------------------ ROTAS EXPRESS ------------------------------------------
router.get("/", (req, res) => {
  res.send(JSON.stringify({ servidor: true }));
});
// ------------------------- REINICIAR CENTRAL -------------------------------------------------
router.get("/reiniciarCentral/:ip", (req, res) => {
  let ip = req.params.ip;
  let ips = `http://${ip}:4000/reiniciar`;

  axios
    .get(ips)
    .then((resp) => {
      console.log(resp.data);
      // res.send(resp.data);
    })
    .catch((e) => {
      res.send("Não foi possivel reiniciar..");
    });
});
// ------------------------- AMPORTAL RESTART CENTRAL -------------------------------------------------
router.get("/amportalCentral/:ip", (req, res) => {
  let ip = req.params.ip;
  let ips = `http://${ip}:4000/amportal`;

  axios
    .get(ips)
    .then((resp) => {
      console.log(resp.data);
      // res.send(resp.data);
    })
    .catch((e) => {
      res.send("Não foi possivel reiniciar..");
    });
});
// ------------------------SELECT centrais E DEPOIS ORGANIZAR POR TAMANHO HD--------------------
router.get("/centraisHd", selecaoController.indexStatusHd);
// ------------------------------------SELECT centrais------------------------------------------
router.get("/centrais", selecaoController.select);
// ------------------------------------SELECT centrais por ID-----------------------------------
router.get("/centrais/:id", selecaoController.selectpoiId);
// ------------------------------------INSERT INTO novas centrais-------------------------------
router.post("/centrais", selecaoController.insert);
//------------------------------------ UPDATE por ID--------------------------------------------
router.put("/centrais/:id", selecaoController.update);
// ------------------------------------ DELETE centrais por id----------------------------------
router.delete("/centrais/:id", selecaoController.delete);
// ---------------------------------------------------------------------------------------------
router.get("/pegarhorario", (req, res) => {
  res.status(200).json({ horas: horario.toLocaleString() });
});
// ---------------------------------------------------------------------------------------------
router.get("/pegar", (req, res) => {
  const resultado = treta;
  resultado.sort((a, b) => {
    const nameA = a.hd;
    const nameB = b.hd;

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  res.status(200).json(resultado);
});

router.get("/centraisPorIp", (req, res) => { });
// ---------------------------------------------------------------------------------------------
router.get("/statusCentral", async (req, res) => {
  axios
    .get("http://172.16.233.94:4000/status_hd")
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((e) => {
      res.send("Não foi possivel listar..");
    });
});
// ------------------------------- TERMINAL SERVER ---------------------------------------------
router.get("/terminalserver", (req, res) => {
  console.log("iniciaqndo conexão TS");

  rdp({
    address: "192.168.235.50",
    username: "DOMAIN\\patrick",
    password: "22041951",
  })
    .then(function () {
      console.log("Conexão Terminal Server encerrada...");
    })
    .catch(function (erro) {
      console.log("Erro: " + erro);
    });
});

// ======================================== FUNÇÔES ============================================
// ------------------------------------ Enviar email e abrir um chamado no milvus  ---------------------------------
function enviarEmail() {
  const resultado = treta;
  resultado.sort((a, b) => {
    const nameA = a.hd;
    const nameB = b.hd;

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < resultado.length; i++) {
    if (resultado[i].hd >= 80) {
      email = {
        nome: resultado[i].empresa,
        hd: resultado[i].hd,
        tempolig: resultado[i].tempo,
        ipcentral: resultado[i].ip,
      };

      var transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: "suporte1.onevoip@gmail.com",
          pass: "btui wcuh qtvd npwm",
        },
      });

      var mailOptions = {
        from: "One Support",
        to: "clientes@onevoip.com.br",
        subject: "Status central ip",
        html: `<h1>${email.nome}</h1>
                    
                      <p> Empresa: <span style="color: blue"> ${email.nome} </span></p>
                      <p> Ip/Dns: ${email.ipcentral} </p>
                      <p> Hd: <span style="color: red"> ${email.hd}%</span> em uso</p>
                      <p> ligado: ${email.tempolig}</p>
                      <p style="color: red">#### Fechar as conexões assim que terminar o atendimento ####</p>
                    `,
      };
      // to: "clientes@onevoip.com.br",
      // patrick@onesupport.com.br
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          // res.send(info.response);
        }
      });
    }
  }
}

// ------------------------------------ retornar objeto por ID ---------------------------------
function buscarCentraisIp(id) {
  return centraisIp.filter((centralip) => centralip.id == id);
}
// ------------ retornar a posição ou index do elemento no array por id exp: [0] [1] etc -------
function buscaIndexcentrais(id) {
  return centraisIp.findIndex((central) => central.id == id);
}
// return centraisIp.findIndex((central) => central.id == id);
function buscarPorIp() {
  const sql = "SELECT * FROM centrais;";
  conexao.query(sql, (erro, resultado) => {
    if (erro) {
      return erro;
    } else {
      treta = []; // zerar a variavel treta

      const respo = resultado.length;

      for (let i = 0; i < respo; i++) {
        const ips = resultado[i].ip;

        axios
          .get(`http://${ips}:4000/status_hd`)
          .then((resp) => {
            // console.log(resp.data);

            treta.push({
              empresa: resultado[i].empresa,
              ip: resultado[i].ip,
              matriz: resultado[i].matriz,
              hd: resp.data.hd,
              tempo: resp.data.tempo,
              down: resp.data.redeDown,
              up: resp.data.redeUp,
              processador: resp.data.processa,
            });
          })
          .catch((e) => {
            return "Não foi possivel listar..";
          });
      }
    }
  });
}

// function buscarPorIpinformacao() {
//   const sql = "SELECT * FROM centrais;";
//   conexao.query(sql, (erro, resultado) => {
//     if (erro) {
//       return erro;
//     } else {
//       treta = []; // zerar a variavel treta

//       const respo = resultado.length;

//       for (let i = 0; i < respo; i++) {
//         const ips = resultado[i].ip;

//         axios
//           .get(`http://${ips}:4000/informacao`)
//           .then((resp) => {
//             console.log(resp.data.horario);
//             horario.push({
//               hora: resp.data.horario,
//             });
//           })
//           .catch((e) => {
//             return "Não foi possivel listar..";
//           });
//       }
//     }
//   });
// }

buscarPorIp();
// buscarPorIpinformacao();


setTimeout(enviarEmail, 5000);
// ENVIAR EMAIL A CADA 24 HORAS
setInterval(enviarEmail, 1000 * 60 * 60 * 24);

setInterval(buscarPorIp, 20000);
export default router;
