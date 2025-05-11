import puppeteer from "puppeteer";
import Data from "./data.js";
import { login, deleteTemporaryFiles } from "../bot/token.js";

// Inicialización del navegador y configuración de la página
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.setDefaultTimeout(2 * 60 * 1000);
await page.setViewport({ width: 1080, height: 1024 });

try {
  // Navegación a la URL del SAT
  await page.goto(Data.urlSAT);
} catch (error) {
  console.log("La pagina no cargo");
}

let certificadoTemp, llaveTemp, passwordKey, cfdi;

try {
  // Extracción del token de login y asignación de datos temporales
  const loginData = await login();
  certificadoTemp = loginData.certificadoTemp;
  llaveTemp = loginData.llaveTemp;
  passwordKey = loginData.passwordKey;
  cfdi = loginData.cfdi;
} catch (error) {
  console.log("Error en el token");
}
cfdi.loginData.cfdi;
try {
  // Subida del archivo de certificado al formulario
  const inputCertificado = await page.$("#fileCertificate");
  await inputCertificado.uploadFile(certificadoTemp);
} catch (error) {
  console.log(
    "el archivo de Certificado no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));

try {
  // Subida del archivo de clave privada al formulario
  const inputLlave = await page.$("#filePrivateKey");
  await inputLlave.uploadFile(llaveTemp);
} catch (error) {
  console.log(
    "el archivo de Clave privada no se subio correctamente, intente nuevamente"
  );
}

await new Promise((resolve) => setTimeout(resolve, 3000));

try {
  // Llenado del campo de contraseña de la clave privada
  await page.locator("#privateKeyPassword").fill(passwordKey);
} catch (error) {
  console.log(
    "el archivo de Password no se subio correctamente, intente nuevamente"
  );
}

try {
  // Envío del formulario
  await page.locator("#submit").click();
} catch (error) {
  console.log("No se encontro el boton de enviar");
}
await new Promise((resolve) => setTimeout(resolve, 6000));

// Entrada al Panel del SAT

//Buscar el boton de enviar
try {
  await page.locator("#enviar").click();
} catch (error) {
  console.log("No se encontro el boton de enviar");
}

//Subir el archivo zip
try {
  await page.waitForSelector("#archivoZip", { visible: true });
  const jsonZip = await page.$("#archivoZip");
  await jsonZip.uploadFile(cfdi);
} catch (error) {
  console.log("No se encontró o no se pudo cargar el archivo ZIP");
}
await new Promise((resolve) => setTimeout(resolve, 6000));

try {
  // Modal de visualizar Detalle del archivo del zip
  await page.locator("#agregar").click();
} catch (error) {
  console.log("No se encontro el boton de agregar");
}

try {
  // Envio del .zip al SAT
  await page.locator("#enviar").click();
} catch (error) {
  console.log("No se encontro el boton de enviar");
}

//Firmar el zip del SAT del .zip
try {
  await page.locator("#firma").click();
} catch (error) {
  console.log("Error ");
}

//Agregar nuevamente los archivos de la e.firma para confirmar la firma del .zip
try {
  const inputCertificado = await page.$("#fileCertificate");
  await inputCertificado.uploadFile(certificadoTemp);
  const inputLlave = await page.$("#filePrivateKey");
  await inputLlave.uploadFile(llaveTemp);
  await page.locator("#privateKeyPassword").fill(passwordKey);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.locator("#submit").click();
} catch (error) {
  console.log("Error ");
}

//Al finalizar el proceso de la carga de archivos, se eliminan los archivos temporales
try {
  // Eliminación de los archivos temporales utilizados
  await deleteTemporaryFiles(certificadoTemp, llaveTemp, cfdi);
  // Cierre del navegador
  await browser.close();
} catch (error) {
  console.log("Error al eliminar los archivos temprales");
}
