import puppeteer from "puppeteer";
import { readFile } from "fs/promises";
import Data from "./data.js";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

try {
  await page.goto(Data.urlSAT);
} catch (error) {
  console.log("La pagina no cargo ");
}

await page.setViewport({ width: 1080, height: 1024 });

try {
  const inputCertificado = await page.$("#fileCertificate");
  await inputCertificado.uploadFile(Data.certificadoSAT);
} catch (error) {
  console.log(
    "el archivo de Certificado no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));
try {
  const inputLlave = await page.$("#filePrivateKey");
  await inputLlave.uploadFile(Data.llaveSAT);
} catch (error) {
  console.log(
    "el archivo de Clave privada no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));

try {
  const passwordContenido = await readFile(Data.passwordSAT, "utf-8");
  const passwordJson = JSON.parse(passwordContenido);
  const password = passwordJson.password;
  await page.locator("#privateKeyPassword").fill(password);
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
