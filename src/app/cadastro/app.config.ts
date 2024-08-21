import { ApplicationConfig } from "@angular/core";
import { provideEnvironmentNgxMask } from "ngx-mask";

export const appConfig: ApplicationConfig = {
  providers: [provideEnvironmentNgxMask()],
};
