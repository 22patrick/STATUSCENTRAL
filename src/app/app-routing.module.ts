import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavegadorComponent } from "./navegador/navegador.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ListaclientesComponent } from "./listaclientes/listaclientes.component";
import { TesteDashboardComponent } from "./dashboard-novo/teste-dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "home", component: NavegadorComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "lista", component: ListaclientesComponent },
  { path: "dashboard", component: TesteDashboardComponent },
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
