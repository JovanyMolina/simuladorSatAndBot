"use client";
import { useState } from "react";
import { Facebook, Twitter, Calendar } from "lucide-react";

export default function ConsultaControlesVolumetricos() {
  const [userId, setUserId] = useState("MWH571218QD9");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [folio, setFolio] = useState("");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const tiposDocumento = [
    "Declaración mensual",
    "Complemento",
    "Corrección",
    "Reporte trimestral",
  ];

  const estadosDocumento = [
    "Procesado",
    "En revisión",
    "Rechazado",
    "Aceptado",
  ];

  // Datos de ejemplo para simular resultados de búsqueda
  const datosEjemplo = [
    {
      estado: "Procesado",
      folio: "F20250412-001",
      nombreArchivo: "CV_Hidrocarburos_ENE2025.xml",
      fechaProcesamiento: "12/04/2025",
      fechaInicio: "01/01/2024",
      tipoActividad: "Almacenamiento",
      tipo: "Declaración mensual",
      rfc: "MWH571218QD9",
    },
    {
      estado: "Aceptado",
      folio: "F20250315-042",
      nombreArchivo: "CV_Petrolif_FEB2025.xml",
      fechaProcesamiento: "15/03/2025",
      fechaInicio: "01/02/2024",
      tipoActividad: "Distribución",
      tipo: "Declaración mensual",
      rfc: "MWH571218QD9",
    },
  ];

  const handleBuscar = (e) => {
    e.preventDefault();
    // Simular una búsqueda con los datos de ejemplo
    setResultados(datosEjemplo);
    setBusquedaRealizada(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-burgundy-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className=" p-1 rounded">
              <img
                src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                alt="Logo SAT"
                className="h-10"
              />
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:underline">
                Trámites
              </a>
              <a href="#" className="text-white hover:underline">
                Gobierno
              </a>
              <button className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Subheader */}
      <div className="bg-burgundy-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-2xl font-semibold">CONTROLES VOLUMETRICOS</h1>
            <div className="flex space-x-6">
              <a href="/panel" className="text-white hover:underline">
                Enviar
              </a>
              <a href="#" className="text-white hover:underline">
                Consultas
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb and User Info */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a
            href="#"
            className="text-gray-600 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
          <span className="text-gray-600">›</span>
          <a href="#" className="text-gray-600 hover:underline">
            Inicio
          </a>
          <span className="text-gray-600">›</span>
          <span className="text-gray-600">Consulta</span>
        </div>
        <div className="flex items-center">
          <span className="px-4 py-1 border border-gray-300  text-black bg-white">
            {userId}
          </span>
          <a href="#" className="text-blue-600 ml-2 hover:underline">
            Salir
          </a>
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Logos */}
        <div className="flex space-x-8 items-center mb-6">
          <img
            src="https://news.dna3.com.mx/wp-content/uploads/2021/01/Logohacienda.png"
            alt="Logo Hacienda"
            className="h-16"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_del_SAT.svg"
            alt="Logo SAT"
            className="h-14"
          />
        </div>
        <br />
        <br />
        <br />

        {/* Formulario de Consulta */}
        <div className="bg-white border border-gray-300 mb-8">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
            <h2 className="text-xl font-semibold text-black">
              Consulta de documentos recibidos
            </h2>
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleBuscar} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Fecha inicial:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={fechaInicial}
                    onChange={(e) => setFechaInicial(e.target.value)}
                    className="w-full p-2 border border-gray-300   pr-10 text-black"
                    placeholder="DD/MM/AAAA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tipo:</label>
                <div className="relative">
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full p-2 border border-gray-300 appearance-none text-black"
                  >
                    <option value="">seleccione ...</option>
                    {tiposDocumento.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Fecha final:</label>
                <div className="relative">
                  <input
                    type="date"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                    className="w-full p-2 border border-gray-300 pr-10 text-black"
                    placeholder="DD/MM/AAAA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Estado:</label>
                <div className="relative">
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full p-2 border border-gray-300 appearance-none text-black"
                  >
                    <option value="">seleccione ...</option>
                    {estadosDocumento.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Folio:</label>
                <input
                  type="text"
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  className="w-full p-2 border border-gray-300 text-black"
                  placeholder="Folio"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-burgundy-700 text-white px-6 py-2 hover:bg-burgundy-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Resultados */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Estado
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Folio
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Nombre del archivo
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Fecha de procesamiento
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Fecha de inicio
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Tipo de actividad
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Tipo
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  RFC del contribuyente
                </th>
              </tr>
            </thead>
            <tbody>
              {busquedaRealizada && resultados.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No se encontraron resultados.
                  </td>
                </tr>
              )}

              {resultados.map((resultado, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.estado}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.folio}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.nombreArchivo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.fechaProcesamiento}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.fechaInicio}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.tipoActividad}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.tipo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resultado.rfc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <br />
      <br />
      <br />
      <br />
      <br /> {/* Footer */}
      <footer className="bg-burgundy-800 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex items-center">
              <div className=" p-1 rounded">
                <img
                  src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                  alt="Logo SAT"
                  className="h-10"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-2">Enlaces</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Participa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Publicaciones Oficiales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Marco Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Plataforma Nacional de Transparencia
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-2">¿Qué es gob.mx?</h3>
              <p className="text-sm mb-2">
                Es el portal único de trámites, información y participación
                ciudadana.
              </p>
              <a href="#" className="text-sm hover:underline">
                Leer más
              </a>

              <div className="mt-4">
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      Portal de datos abiertos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Declaración de accesibilidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Aviso de privacidad integral
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Aviso de privacidad simplificado
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Términos y Condiciones
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Política de seguridad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Mapa de sitio
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-2">
                Denuncia contra servidores públicos
              </h3>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Síguenos en</h3>
                <div className="flex space-x-2">
                  <a href="#" className="hover:text-gray-200">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="hover:text-gray-200">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Border */}
        <div className="h-4 w-full bg-burgundy-900 mt-4 bg-opacity-20 bg-pattern-mexican">
          <img
            src="https://framework-gb.cdn.gob.mx/gobmx/img/pleca.svg"
            alt=""
          />
        </div>
      </footer>
      <style jsx>{`
        .bg-burgundy-800 {
          background-color: #6b1139;
        }
        .bg-burgundy-700 {
          background-color: #8a1649;
        }
        .bg-burgundy-900 {
          background-color: #4a0c28;
        }
        .bg-pattern-mexican {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23fff' fill-opacity='.1'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
