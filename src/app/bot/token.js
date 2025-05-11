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

  let cfdi, cfdiTemp;

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

  //Descarga del CFDI
  try {
    const cfdiDoc = await axios.get(
      `http://localhost:8080/api/tenant/${Data.tenantId}/cfdi/import`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    cfdi = cfdiDoc.data.documentos?.[0]?.downloadUrl;
  } catch {
    console.log("Error en descargar el CDFI ");
    return;
  }

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

    //console.log("Datos: ", efirma.data);
    if (!certificadoFile || !llaveFile) {
      console.error("No se encontraron archivos ");
      return;
    }

    if (!passwordKey) {
      console.error("No se encontro passwordKey ");
      return;
    }

    /* console.log("url", certificadoFile); */
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

    return {
      certificadoTemp,
      llaveTemp,
      passwordKey,
      cfdi,
    };
  } catch (error) {
    console.log(
      "Error en descarga de los archivos o creacion de la carpeta temporal",
      error
    );
    return;
  }
};

// Eliminar archivos temporales de la E.firma
export async function deleteTemporaryFiles(certificadoTemp, llaveTemp, cdfi) {
  try {
    if (fs.existsSync(certificadoTemp)) {
      await fs.promises.unlink(certificadoTemp);
    }
    if (fs.existsSync(llaveTemp)) {
      await fs.promises.unlink(llaveTemp);
    }
    if (fs.existsSync(cdfi)) {
      await fs.promises.unlink(cdfi);
    }
  } catch (error) {
    console.log("Error al eliminar los archivos temporales", error);
    return;
  }
}
