import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ProvedorService } from "../provedor.service";
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {
  FloatLabelType,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule, MatCardTitle } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
@Component({
  selector: "app-listaclientes",
  templateUrl: "./listaclientes.component.html",
  styleUrls: ["./listaclientes.component.scss"],
})
export class ListaclientesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  vemquetem!: any;
  dataSource!: any;
  status: any;
  animal: any;
  name: any;

  constructor(private server: ProvedorService, public dialog: MatDialog) {}

  displayedColumns: string[] = [
    "edit",
    "empresa",
    "ip",

    "versao",
    "porta",
    "status",
    "opcoes",
  ];
  // "usuario",
  // "senha",
  public resul: any;

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.server.empresa().subscribe((resultado) => {
      this.vemquetem = resultado;
      this.dataSource = new MatTableDataSource(this.vemquetem);
      this.dataSource.paginator = this.paginator;
      this.pesquisarCentrais();
    });
  }

  // ======================= LISTAR CENTRAIS =======================
  pesquisarCentrais() {
    this.server.pesquisarCentrais().subscribe((centrais) => {
      // this.dados = centrais;

      var conta = centrais.length;
      for (let i = 0; i < conta; i++) {
        this.status = conta[i];
      }
      console.log(conta);
    });
  }

  pesquisar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // ================================ DIALOG DELETE =============================
  operacaoDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: any,
    empresa: any
  ): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id, empresa },
    });

    dialogRef.beforeClosed().subscribe((result) => {
      console.log("The dialog was closed");
      id = result;
    });
  }
  // ================================ DIALOG EDITAR =============================
  operacaoEditar(
    id: any,
    empresa: any,
    ip: any,
    usuario: any,
    senha: any,
    porta: any,
    versao: any
  ) {
    const dialogRef = this.dialog.open(DialogEditar, {
      data: { id, empresa, ip, usuario, senha, porta, versao },
    });

    dialogRef.beforeClosed().subscribe((result) => {
      console.log("The dialog was closed");
      id = result;
    });

    console.log(id, empresa, ip, usuario, senha, porta, versao);
  }
}
// ================================ COMPONENTE DELETAR ==========================
@Component({
  selector: "dialog-content-example-dialog",
  templateUrl: "dialog-deletar.html",
  styleUrls: ["./dialog-deletar.scss"],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class DialogDelete {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public server: ProvedorService,
    private _snackBar: MatSnackBar
  ) {}
  deletar(id: any) {
    this.server.deletarEmpresa(id).subscribe((resultado) => {
      if (resultado == 1) {
        this._snackBar.open("Empresa excluída com sucesso ", "Sair", {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["redNoMatch"],
        });
        setInterval(() => {
          window.location.reload();
        }, 2000);
      }

      if (resultado == 0) {
        this._snackBar.open("Não foi possivel excluir a empresa", "Sair", {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["erroredNoMatch"],
        });
      }
    });
  }
  erro(): void {
    console.log("fechou ");
  }
}
// ================================ COMPONENTE EDITAR ==========================
@Component({
  selector: "dialog-overview-example",
  templateUrl: "dialog-editar.html",
  styleUrls: ["./dialog-editar.scss"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class DialogEditar {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

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
    versao: [null, Validators.required],
  });
  errorMessage = "";
  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public provedor: ProvedorService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    // merge(this.razaosocial.statusChanges, this.razaosocial.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.addressForm.hasError("required")) {
      this.errorMessage = "You must enter a value";
    } else if (this.addressForm.hasError("email")) {
      this.errorMessage = "Not a valid email";
    } else {
      this.errorMessage = "";
    }
  }

  alterar(id: any) {
    let cadastro = {
      empresa: this.addressForm.get("razaoSocial")?.value,
      ip: this.addressForm.get("ipCentral")?.value,
      usuario: this.addressForm.get("usuario")?.value,
      senha: this.addressForm.get("senha")?.value,
      porta: this.addressForm.get("porta")?.value,
      versao: this.addressForm.get("versao")?.value,
    };

    console.log(cadastro);

    this.provedor.editarEmpresa(id, cadastro).subscribe((retorno: any) => {
      if (retorno.affectedRows == 1) {
        console.log("Cadastrado com sucesso!!!");
        this._snackBar.open("Empresa alterada com sucesso ", "Sair", {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["redNoMatch"],
        });
        setInterval(() => {
          window.location.reload();
        }, 2000);
        // this.openSnackBar();
      } else {
        // this.erropenSnackBar();
      }
    });
  }

  hasUnitNumber = false;

  versao = [
    { central: "Elastix - Asterisk 11" },
    { central: "Elastix - Asterisk 12" },
    { central: "Issabel - Asterisk 16" },
  ];

  erro(): void {
    console.log("fechou ");
  }
}

// selector: "dialog-content-example-dialogg",
