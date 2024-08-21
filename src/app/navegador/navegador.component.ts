import { Component, inject, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AsyncPipe, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { ProvedorService } from "../provedor.service";

@Component({
  selector: "app-navegador",
  templateUrl: "./navegador.component.html",
  styleUrls: ["./navegador.component.scss"],
})
export class NavegadorComponent implements OnInit {
  constructor(private rotas: Router, private server: ProvedorService) {}

  ngOnInit(): void {
    // this.cronometro(10);
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  reload() {
    window.location.reload();
  }

  portaexterna() {
    this.server.portaexterna().subscribe((retorno) => {
      console.log(retorno);
    });
  }

  portacorredor() {
    this.server.portacorredor().subscribe((retorno) => {
      console.log(retorno);
    });
  }

  // pad(s: any) {
  //   return s < 10 ? "0" + s : s;
  // }

  // cronometro(segundos: any) {
  //   var seg = segundos % 60;
  //   var min = Math.floor(segundos / 60);
  //   document.getElementById("contador")!.innerHTML = [min, seg]
  //     .map(this.pad)
  //     .join(":");

  //   if (segundos > 0) {
  //     setTimeout(this.cronometro, 1000, segundos - 1);
  //   }
  // }
}
