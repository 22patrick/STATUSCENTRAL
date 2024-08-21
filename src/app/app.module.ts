import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavegadorComponent } from "./navegador/navegador.component";
import { HttpClientModule } from "@angular/common/http";
// ===== === ==== MATERIAL
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ListaclientesComponent } from "./listaclientes/listaclientes.component";
import { MatDialogModule } from "@angular/material/dialog";
import { TesteDashboardComponent } from "./dashboard-novo/teste-dashboard.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    CadastroComponent,
    ListaclientesComponent,
    TesteDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // ======= MATERIAL ======
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule,
    // ======== MASK INPUT =====
    NgxMaskDirective,
    NgxMaskPipe,
    // ======================
  ],
  providers: [MatSnackBar, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule { }
