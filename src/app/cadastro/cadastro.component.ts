import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  FloatLabelType,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { ProvedorService } from "../provedor.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
  providers: [provideNgxMask(), NgxMaskPipe, NgxMaskDirective],
})
export class CadastroComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  disableSelect = new FormControl(false);
  hide = true;
  dataCadastro: any
  formGroup: any;

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private provedor: ProvedorService
  ) { }

  // ngAfterViewInit(): void {
  //   var options = {
  //     onKeyPress: function (
  //       text: any,
  //       event: any,
  //       currentField: any,
  //       options: any
  //     ) {
  //       if (text) {
  //         var ipArray = text.split(".");
  //         var lastValue = ipArray[ipArray.length - 1];
  //         if (lastValue != "" && parseInt(lastValue) > 255) {
  //           ipArray[ipArray.length - 1] = "255";
  //           var resultingValue = ipArray.join(".");
  //           currentField.text(resultingValue).val(resultingValue);
  //         }
  //       }
  //     },
  //     translation: {
  //       Z: {
  //         pattern: /[0-9]/,
  //         optional: true,
  //       },
  //     },
  //   };

  //   $(".ipaddr").mask("0ZZ.0ZZ.0ZZ.0ZZ", options);

  //   $(".mask-ipv4").mask("000.000.000.000", options);

  //   $(".ip_address").mask("0ZZ.0ZZ.0ZZ.0ZZ", {
  //     translation: { Z: { pattern: /[0-9]/, optional: true } },
  //   });

  //   $("#hide").click(function () {
  //     $("p").hide();
  //   });

  //   $("#show").click(function () {
  //     $("p").show();
  //   });
  // }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || "auto";
  }

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto" as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    razaoSocial: [null, Validators.required],
    ipCentral: [null, Validators.required],
    usuario: [null, Validators.required],
    senha: [null, Validators.required],
    porta: [null, Validators.required],
    asterisk: [null, Validators.required],
  });

  addCadastro() {
    // var today = new Date();
    // var ano = today.getFullYear();
    // let mes = [today.getMonth() + 1];
    // var dia = today.getDate();
    // var horas = today.getHours();
    // var minutos = today.getMinutes();
    // var segundos = today.getSeconds();

    var today = new Date();
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const d = new Date();
    var ano = today.getFullYear();
    let mes = [today.getMonth() + 1];
    var dia = today.getDate();
    var horas = today.getHours();
    var minutos = today.getMinutes();
    var segundos = today.getSeconds();

    console.log(`${ano}/${mes}/${dia} - ${horas}:${minutos}:${segundos}`);

    this.dataCadastro = `${ano}/${mes}/${dia} - ${horas}:${minutos}:${segundos}`

    let cadastro = {
      empresa: this.addressForm.get("razaoSocial")?.value,
      ip: this.addressForm.get("ipCentral")?.value,
      usuario: this.addressForm.get("usuario")?.value,
      senha: this.addressForm.get("senha")?.value,
      porta: this.addressForm.get("porta")?.value,
      versao: this.addressForm.get("asterisk")?.value,
      status: true,
      dataCadastro: this.dataCadastro

      // data_cadas: tempo,
    };

    // console.log(cadastro);

    this.provedor.cadastrarEmpresa(cadastro).subscribe((retorno: any) => {
      if (retorno.affectedRows == 1) {
        console.log("Cadastrado com sucesso!!!");
        this.openSnackBar();
        console.log("DEU BOM");
      } else {
        this.erropenSnackBar();
        console.log("DEU RUIM");
      }
    });
  }

  hasUnitNumber = false;

  versao = [
    { central: "Elastix - Asterisk 11" },
    { central: "Elastix - Asterisk 12" },
    { central: "Issabel - Asterisk 16" },
  ];

  // onSubmit(): void {
  //   alert("Thanks!");
  // }

  openSnackBar() {
    this._snackBar.open("Cadastrado com sucesso!! ", "", {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["redNoMatch"],
    });
  }

  erropenSnackBar() {
    this._snackBar.open("Não foi possivel cadastrar!! ", "", {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["erroredNoMatch"],
    });
  }

  data() {

  }
}
