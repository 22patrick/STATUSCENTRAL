import { Service } from "node-windows";

var svc = new Service({
  nome: "Hello World",
  descrição: "O servidor web de exemplo nodejs.org.",
  script: "C:\\caminho\\para\\helloworld.js",
  execPath: "C:\\caminho\\para\\específico\\node.exe",
});

svc.on("install", function () {
  svc.start();
});

svc.install();
