import puppeteer from "puppeteer";
import Data from "./data.js";
import { login, eliminarArchivosTemp } from "../bot/token.js";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.setDefaultTimeout(2 * 60 * 1000);
await page.setViewport({ width: 1080, height: 1024 });

try {
  await page.goto(Data.urlSAT);
} catch (error) {
  console.log("La pagina no cargo");
}
let certificadoTemp, llaveTemp, passwordKey;

try {
  const loginData = await login();
  certificadoTemp = loginData.certificadoTemp;
  llaveTemp = loginData.llaveTemp;
  passwordKey = loginData.passwordKey;
} catch (error) {
  console.log("Error en el token");
}

try {
  const inputCertificado = await page.$("#fileCertificate");
  await inputCertificado.uploadFile(certificadoTemp);
} catch (error) {
  console.log(
    "el archivo de Certificado no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));
try {
  const inputLlave = await page.$("#filePrivateKey");
  await inputLlave.uploadFile(llaveTemp);
} catch (error) {
  console.log(
    "el archivo de Clave privada no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));

try {
  await page.locator("#privateKeyPassword").fill(passwordKey);
} catch (error) {
  console.log(
    "el archivo de Password no se subio correctamente, intente nuevamente"
  );
}

try {
  await page.locator("#submit").click();
} catch (error) {
  console.log("No se encontro el boton de enviar");
}

try {
  await eliminarArchivosTemp(certificadoTemp, llaveTemp);
} catch (error) {
  console.log("Error al eliminar los archivos temprales");
}
