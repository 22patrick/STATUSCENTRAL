import { Component, OnInit } from "@angular/core";
import { ProvedorService } from "../provedor.service";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dadosHd = "locura";

  usadoMaringa: any;
  particaoMaringa: any;
  tamanhoMaringa: any;

  usadoPatrick: any;
  particaoPatrick: any;
  tamanhoPatrick: any;

  usadoOne: any;
  particaoOne: any;
  tamanhoOne: any;
  horario: any;
  centralMga!: any;
  ligado: any;

  maior = "menor";

  dados: any;

  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  durationInSeconds = 4;
  constructor(
    private provedor: ProvedorService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.openSnackBar();
    this.pesquisarCentrais();

    setTimeout(() => {
      if (this.dados[0].hd >= 80) {
        this.audio();
        console.log(" //--- chama o audio de alerta/////////");
      }
    }, 3000);

    setInterval(() => {
      window.location.reload();
    }, 200 * 1000);
  }

  ngOnload() {}

  audio() {
    let som = new Audio();
    som.src = "../assets/sounds/sounds/X8.wav";
    som.load();
    som.play();
  }

  pesquisarCentrais() {
    this.provedor.pesquisarCentrais().subscribe((centrais) => {
      console.log(centrais);
      this.dados = centrais;
    });

    // setInterval(this.pesquisarCentrais , 5000)
  }

  openSnackBar() {
    this.provedor.serverApi().subscribe({
      next: (customer) => {
        console.log(customer);
        // this.customer = customer,
      },
      error: (err) => {
        console.log(err);
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

  reiniciarCentral(louco: any) {
    this.provedor.reiciniar(louco).subscribe((centrais) => {
      console.log(centrais);
    });
  }

  amportal(louco: any) {
    this.provedor.amportalRestart(louco).subscribe((centrais) => {
      console.log(centrais);
    });
  }

  terminalServer() {
    this.provedor.acessoTs().subscribe((centrais) => {
      console.log(centrais);
    });
  }
}

// let dados = central.length;

// for (let i = 0; i < dados; ++i) {
//   if (central[i]._mounted == '/') {
//     let calculo = central[i]._blocks;
//     let gbValue = (calculo / (1024 * 1024 * 1024)).toFixed(3);

//     let resul = {
//       "usado": central[i]._capacity,
//       "particao": central[i]._filesystem,
//       "tamanho": gbValue
//     }
//     console.log(resul);
//     this.usadoPatrick = parseInt(resul.usado);
//     this.particaoPatrick = resul.particao;
//     this.tamanhoPatrick = resul.tamanho;

//     if (this.usadoPatrick >= 10) {
//       this.maior = 'maior'
//     } else {
//       this.maior = 'menor'
//     }
//   }
// }
