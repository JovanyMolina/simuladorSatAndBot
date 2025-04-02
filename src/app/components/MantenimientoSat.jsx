"use client";

import React from "react";

const MantenimientoSAT = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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

      <main className="flex-grow py-16 px-4">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 text-center text-gray-800">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">
            ⚠️ Mantenimiento en curso
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Estimado contribuyente:
          </p>
          <p className="text-base text-gray-700">
            El sistema se encuentra temporalmente en mantenimiento. Estamos
            trabajando para restablecer el servicio lo antes posible.
          </p>
          <p className="text-sm text-gray-500 mt-6">
            Agradecemos tu comprensión.
          </p>
        </div>

        {/* Aviso de privacidad */}
        <div className="max-w-xl mx-auto mt-10 bg-blue-50 border border-blue-200 text-blue-800 p-5 rounded text-sm">
          <strong className="block mb-1 text-center">
            Aviso de privacidad simplificado
          </strong>
          <p className="text-center">
            El Servicio de Administración Tributaria es responsable del
            tratamiento de los datos personales que se recolectan a través de su
            portal
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
      </main>
    </div>
  );
};

export default MantenimientoSAT;
