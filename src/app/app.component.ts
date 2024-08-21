import { ApplicationConfig, Component } from "@angular/core";
import { provideEnvironmentNgxMask } from "ngx-mask";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "central_ip";
}

export const appConfig: ApplicationConfig = {
  providers: [provideEnvironmentNgxMask()],
};
