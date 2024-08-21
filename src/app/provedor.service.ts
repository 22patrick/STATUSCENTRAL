import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// ==================== WEB WebSocket ===================
// const WebSocket = require("ws");
// const ws = new WebSocket("ws://localhost:3000");
// const readlineSync = require("readline-sync");
// const symbol = readlineSync.question("Qual par de moedas deseja monitorar? ");
// ======================================================

@Injectable({
  providedIn: "root",
})
export class ProvedorService {
  constructor(private http: HttpClient) {}

  servidor = "http://192.168.235.65:3000";
  // -------------------------------- VARIAVEIS --------------------------------
  porta = 4000;
  pesquisarCentral_api = `${this.servidor}/pegar`;
  serverWeb = `${this.servidor}/reiniciarCentral/`;
  serverWebAmport = `${this.servidor}/amportalCentral/`;
  terminalServer = `${this.servidor}/terminalserver/`;
  backend = `${this.servidor}/centrais/`;

  serverApi() {
    return this.http.get(`${this.servidor}`).pipe((res) => res);
  }
  // -------------------------------- FUNÇÔES  ---------------------------------
  empresa() {
    return this.http.get(this.backend).pipe((res) => res);
  }
  pesquisarCentrais(): Observable<any> {
    return this.http.get(this.pesquisarCentral_api).pipe((res) => res);
  }
  reiciniar(ip: any): Observable<any> {
    return this.http.get(this.serverWeb + ip).pipe((res) => res);
  }
  amportalRestart(ip: any): Observable<any> {
    return this.http.get(this.serverWebAmport + ip).pipe((res) => res);
  }
  acessoTs(): Observable<any> {
    return this.http.get(this.terminalServer).pipe((res) => res);
  }
  cadastrarEmpresa(dados: any) {
    return this.http.post(this.backend, dados).pipe((res) => res);
  }

  deletarEmpresa(dados: any) {
    console.log(this.backend + dados);

    return this.http.delete(this.backend + dados).pipe((res) => res);
  }

  editarEmpresa(id: any, cadastro: any) {
    var server = this.backend + id;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React PUT Request Example" }),
    };

    return this.http.put(server, cadastro, requestOptions).pipe((res) => res);
  }

  portaexterna() {
    return this.http
      .get("http://192.168.235.40/API/?tag=789789789&porta=2&usuario=0")
      .pipe((res) => res);
  }

  portacorredor() {
    return this.http
      .get("http://192.168.235.40/API/?tag=789789789&porta=3&usuario=0")
      .pipe((res) => res);
  }
}

// centraisVoip(dados: any): Observable<any> {
//   let qtd = dados.length;

//   for (let i = 0; i < qtd; ++i) {
//     var ips = dados[i].ip
//     console.log(ips);

//   }

//   ips = this.http.get(`http://${ips}:` + this.porta + 'status_hd').pipe(res => res)
//   return ips;
// }
