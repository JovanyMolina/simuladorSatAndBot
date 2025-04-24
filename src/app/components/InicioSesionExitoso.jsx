"use client";

import React from "react";
import { useRouter } from "next/navigation";

const InicioSesionExitoso = () => {
  const router = useRouter();

  const handleContinuar = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header estilo SAT */}
      <header className="bg-[#60003b] text-white py-3 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className=" p-1 rounded">
            <img
              src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
              alt="Logo SAT"
              className="h-10"
            />
          </div>{" "}
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

      <main className="py-16 px-4">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 text-center text-gray-800">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            ¡Inicio de sesión exitoso!
          </h2>
          <p className="text-base text-gray-700 mb-6">
            Bienvenido al sistema del SAT. Tu autenticación ha sido completada
            correctamente.
          </p>

          <button
            onClick={handleContinuar}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continuar
          </button>

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

export default InicioSesionExitoso;
