import axios from "axios";
import Data from "./data.js";
import path from "path";
import os from "os";
import fs from "fs";

export const login = async () => {
  let token;

  let certificadoFile;
  let llaveFile;
  let passwordKey;

  let certificadoTemp;
  let llaveTemp;

  try {
    const login = await axios.post("http://localhost:8080/api/auth/sign-in", {
      email: Data.email,
      password: Data.password,
    });
    token = login.data;
     console.log(token);
  } catch (error) {
    console.log("Error en el token ", error);
    return;
  }

  /*   try {
    const response = await axios.get("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     console.log("Usuario autenticado: "); //response.data);
  } catch (error) {
    console.log("Error en en la autenticacion ", error);
    return;
  } */

  try {
    const efirma = await axios.get(
      `http://localhost:8080/api/tenant/${Data.tenantId}/instalacion-procesos/${Data.proveedorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    certificadoFile = efirma.data.certificateFile?.[0]?.downloadUrl;
    llaveFile = efirma.data.keyFile?.[0]?.downloadUrl;
    passwordKey = efirma.data.passwordKey;

    if (!certificadoFile || !llaveFile) {
      console.error("No se encontraron archivos ");
      return;
    }

    if (!passwordKey) {
      console.error("No se encontro passwordKey ");
      return;
    }

       console.log("url", certificadoFile);
  } catch (error) {
    console.log("Error al consultar la API", error);
    return;
  }

  try {
    const dirrecionTemp = os.tmpdir();
    certificadoTemp = path.join(dirrecionTemp, "Certificado.cer");
    llaveTemp = path.join(dirrecionTemp, "ClavePrivada.key");

    const descargaFile = async (downloadUrl, archivoPath) => {
      const respuesta = await axios.get(downloadUrl, {
        responseType: "stream",
      });
      const escribe = fs.createWriteStream(archivoPath);
      respuesta.data.pipe(escribe);

      return new Promise((resolve, reject) => {
        escribe.on("finish", resolve);
        escribe.on("error", reject);
      });
    };

    await descargaFile(certificadoFile, certificadoTemp);
    await descargaFile(llaveFile, llaveTemp);

    console.log("Ruta del certificado:", certificadoTemp);
    console.log("Ruta de la llave:", llaveTemp);
    console.log("PasswordKey:", passwordKey);

    return {
      certificadoTemp,
      llaveTemp,
      passwordKey,
    };
  } catch (error) {
    console.log(
      "Error en descarga de los archivos o creacion de la carpeta temporal",
      error
    );
    return;
  }
};

export async function eliminarArchivosTemp(certificadoTemp, llaveTemp) {
  try {
    if (fs.existsSync(certificadoTemp)) {
      await fs.promises.unlink(certificadoTemp);
          console.log("Archivo temporal eliminado de certificado");
    }
    if (fs.existsSync(llaveTemp)) {
      await fs.promises.unlink(llaveTemp);
      console.log("Archivo temporal eliminado de llave");
    }
  } catch (error) {
    console.log("Error al eliminar los archivos temporales", error);
    return;
  }
}
