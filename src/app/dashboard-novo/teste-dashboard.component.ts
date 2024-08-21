import { Component, OnInit } from "@angular/core";
import { ProvedorService } from "../provedor.service";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import * as $ from "jquery";

@Component({
  selector: "app-teste-dashboard",
  templateUrl: "./teste-dashboard.component.html",
  styleUrls: ["./teste-dashboard.component.scss"],
})
export class TesteDashboardComponent implements OnInit {
  // ======================= VARIAVEIS ==================
  dados: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  durationInSeconds = 4;
  // ====================================================
  constructor(
    private provedor: ProvedorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.pesquisarCentrais();
    this.openSnackBar();

    setTimeout(() => {
      for (var i = 0; i < this.dados.length; i++) {
        if (this.dados[i].hd >= 80) {
          const alto = {
            id: this.dados[i].id,
            nome: this.dados[i].empresa,
            hd: this.dados[i].hd,
            hd2: '2',
          };

          document.getElementById(alto.hd)!.style.backgroundColor = "#ff8085";
          document.getElementById(alto.hd + 1)!.style.color = "black";
          // "#CD5C5C";
          // ========================== AUDIO =============================
          // let som = new Audio();
          // som.src = "../assets/sounds/sounds/X8.wav";
          // som.play();
          // ==============================================================
        }

        if (this.dados[i].hd <= 79 && this.dados[i].hd >= 70) {
          const medio = {
            id: this.dados[i].id,
            nome: this.dados[i].empresa,
            hd: this.dados[i].hd,
          };
          document.getElementById(medio.hd)!.style.backgroundColor = "#f5e6ab";
          document.getElementById(medio.hd + 1)!.style.color = "black";
          // "#FFDEAD";
          // "#FFA500";
        }
      }
    }, 3000);

    setInterval(() => {
      window.location.reload();
    }, 200 * 1000);
  }

  // ======================= LISTAR CENTRAIS =======================
  pesquisarCentrais() {
    this.provedor.pesquisarCentrais().subscribe((centrais) => {
      this.dados = centrais;
      console.log(this.dados);
    });
  }
  // ==================== REINICIAR CENTRAIS =======================
  reiniciarCentral(louco: any) {
    this.provedor.reiciniar(louco).subscribe((centrais) => {
      // console.log(centrais);
    });
  }
  // ======================= AMPORTAL RESTART ======================
  amportal(louco: any) {
    this.provedor.amportalRestart(louco).subscribe((centrais) => {
      // console.log(centrais);
    });
  }

  // ======================= ERRO DE CONEXÃO =========================
  openSnackBar() {
    this.provedor.serverApi().subscribe({
      next: (customer) => {
        // console.log(customer);
        // this.customer = customer,
      },
      error: (err) => {
        // console.log(err);
        // ------------------ CHAMA O ERRO PRA TELA ----------------------
        this._snackBar.open("Erro ao conectar-se com servidor!! ", "", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
          panelClass: ["redNoMatch"],
        });
      },
    });
  }

  // {
  //   nome: "Patrick Lemo",
  //   idade: 33,
  //   sexo: "Masculino",
  //   olhos: "castanhos",

  //     endereco: [
  //       {
  //       rua: "Bruno de faveri",
  //       numero: 1237,
  //       observacao: "B"
  //       },
  //     {
  //        cor: "verde",
  //     tamanho: "92mt2"
  //     }

  //   ],
  //     Profissao: "Desenvolvedor / TI"

  // }
}
