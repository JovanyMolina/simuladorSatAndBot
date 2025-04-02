"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContrasenaSAT = () => {
  const router = useRouter();
  const [rfc, setRfc] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");

  const handleEnviar = () => {
    if (!rfc || !password || !captcha) {
      setError("Por favor completa todos los campos requeridos.");
    } else {
      setError("");
      console.log("RFC:", rfc);
      console.log("Contraseña:", password);
      console.log("Captcha:", captcha);
      alert("Simulación de envío completada. Revisa la consola.");
    }
  };

  const handleIrAEfirma = () => {
    router.back();  
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado estilo SAT */}
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
            Acceso por contraseña
          </h3>

          {error && (
            <div className="text-red-700 bg-red-100 border border-red-400 rounded p-3 mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {/* RFC */}
            <div className="mb-4">
              <label htmlFor="rfc" className="block font-semibold mb-1">
                RFC:
              </label>
              <input
                type="text"
                id="rfc"
                name="rfc"
                placeholder="RFC"
                value={rfc}
                onChange={(e) => setRfc(e.target.value.toUpperCase())}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold mb-1">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Esta contraseña es la misma de tu CIEC o CIEC fortalecida.
              </p>
            </div>

            {/* Captcha */}
            <div className="mb-4">
              <label htmlFor="captcha" className="block font-semibold mb-1">
                Captcha:
              </label>
              <div className="flex gap-2 items-center">
                <img
                  src="https://dummyimage.com/160x60/cccccc/000000&text=ABC123"
                  alt="captcha"
                  className="border rounded"
                />
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  placeholder="Escribe el captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
                  className="flex-1 border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleIrAEfirma}
                className="px-4 py-2 border rounded bg-gray-200 text-gray-800"
              >
                e.firma
              </button>
              <button
                type="submit"
                onClick={handleEnviar}
                className="px-4 py-2 border rounded bg-blue-600 text-white"
              >
                Enviar
              </button>
            </div>

            <div className="text-right text-sm mt-6 space-y-1">
              <p>
                <a
                  href="https://www.siat.sat.gob.mx/PTSC/auth/faces/pages/restablecer/rc_inicio.jsf"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </p>
              <p>
                Si aún no cuentas con tu contraseña, obtenla{" "}
                <a
                  href="https://portalsat.plataforma.sat.gob.mx/CIECInternet/CIECRegister/askRFC.action"
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  aquí
                </a>
                .
              </p>
              <p>
                Si aún no cuentas con tu e.firma portable, obtenla{" "}
                <a
                  href="https://www.siat.sat.gob.mx/PTSC/faces/pages/lanzador.jsf"
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  aquí
                </a>
                .
              </p>
            </div>
          </form>

          {/* Aviso de privacidad */}
          <div className="bg-blue-50 border border-blue-200 text-blue-800 mt-10 p-5 rounded text-sm">
            <strong className="block mb-1 text-center">
              Aviso de privacidad simplificado
            </strong>
            <p className="text-center">
              El Servicio de Administración Tributaria es responsable del
              tratamiento de los datos personales que se recolectan a través de
              su portal
              <a
                href="https://www.sat.gob.mx"
                target="_blank"
                className="text-blue-600 underline ml-1"
              >
                (https://www.sat.gob.mx)
              </a>
              , conforme a la Ley General de Protección de Datos Personales.
            </p>
            <p className="text-center mt-2">
              Más información:
              <a
                href="https://repositorio.cloudb.sat.gob.mx/FTP/avisoprivacidad/802_NV_aviso_integral.html"
                target="_blank"
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

export default ContrasenaSAT;
