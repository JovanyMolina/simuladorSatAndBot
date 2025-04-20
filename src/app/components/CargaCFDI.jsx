"use client";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  User,
  Bell,
  LogOut,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

export default function SATControlesVolumetricos() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [reportes, setReportes] = useState([
    {
      id: 1,
      nombre: "CV_XAXX010101000_202503.json",
      fecha: "05/01/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250305-001",
    },
    {
      id: 2,
      nombre: "CV_XAXX010101000_202502.json",
      fecha: "14/02/2024",
      estatus: "Rechazado",
      acuse: "ACU-CV-20250214-002",
    },
    {
      id: 3,
      nombre: "CV_XAXX010101000_202501.json",
      fecha: "21/03/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250121-003",
    },
    {
      id: 4,
      nombre: "CV_XAXX010101000_202504.json",
      fecha: "07/04/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250407-004",
    },
    {
      id: 5,
      nombre: "CV_XAXX010101000_202505.json",
      fecha: "18/05/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250518-005",
    },
    {
      id: 6,
      nombre: "CV_XAXX010101000_202506.json",
      fecha: "02/06/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250602-006",
    },
    {
      id: 7,
      nombre: "CV_XAXX010101000_202507.json",
      fecha: "25/07/2024",
      estatus: "Aceptado",
      acuse: "ACU-CV-20250725-007",
    },
  ]);

  const columns = [
    { field: "nombre", headerName: "Nombre del archivo", flex: 1 },
    { field: "fecha", headerName: "Fecha de carga", flex: 1 },
    {
      field: "estatus",
      headerName: "Estatus",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center">
          {params.value === "Aceptado" && (
            <CheckCircle size={16} className="text-green-600 mr-1" />
          )}
          {params.value === "Rechazado" && (
            <AlertTriangle size={16} className="text-red-600 mr-1" />
          )}
          <span
            className={`text-sm ${
              params.value === "Aceptado"
                ? "text-green-600"
                : params.value === "Rechazado"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {params.value}
          </span>
        </div>
      ),
    },
    { field: "acuse", headerName: "Acuse", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            Descargar
          </button>
          {params.row.estatus === "Rechazado" && (
            <button className="text-red-600 hover:text-red-800">
              Ver errores
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && selectedPeriodo) {
      const newReporte = {
        id: reportes.length + 1,
        nombre: selectedFile.name,
        fecha: new Date().toLocaleDateString("es-MX"),
        estatus: "Procesando",
        acuse: "",
      };
      setReportes([newReporte, ...reportes]);
      setSelectedFile(null);
      setSelectedPeriodo("");

      setTimeout(() => {
        setReportes((prevReportes) =>
          prevReportes.map((rep) =>
            rep.id === newReporte.id
              ? {
                  ...rep,
                  estatus: "Aceptado",
                  acuse: `ACU-CV-${new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "")}-${String(newReporte.id).padStart(
                    3,
                    "0"
                  )}`,
                }
              : rep
          )
        );
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ... header y nav igual ... */}
      <header className="bg-[#60003b] text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className=" p-1 rounded">
              <img
                src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                alt="Logo SAT"
                className="h-10"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg"></h1>
              <p className="text-xs"></p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={18} />
              <span className="text-sm">Pedro Jesus Barea </span>
            </div>
            {/* <Bell size={18} /> */}
            <LogOut size={18} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#60003b] text-white">
        <div className="container mx-auto px-4 py-2">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="font-semibold ">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="font-semibold ">
                Controles Volumétricos
              </a>
            </li>
            <li>
              <a href="#" className="font-semibold ">
                Ayuda
              </a>
            </li>
            <li>
              <a href="#" className="font-semibold ">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 pb-2 border-b-2 border-red-700 mb-6">
              Carga de Reportes de Controles Volumétricos
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* RFC */}
              <div>
                <label
                  htmlFor="rfc"
                  className="block font-medium text-black mb-1"
                >
                  RFC:
                </label>
                <input
                  type="text"
                  id="rfc"
                  className="w-full border border-gray-300 text-gray-500 rounded-md px-3 py-2"
                  value="XAXX010101000"
                  disabled
                />
              </div>

              {/* PERIODO */}
              <div>
                <label
                  htmlFor="periodo"
                  className="block font-medium text-black mb-1"
                >
                  Periodo:
                </label>
                <select
                  id="periodo"
                  className="w-full border border-gray-300 text-gray-700 rounded-md px-3 py-2"
                  value={selectedPeriodo}
                  onChange={(e) => setSelectedPeriodo(e.target.value)}
                  required
                >
                  <option value="">Seleccione un periodo</option>
                  <option value="202301">Enero 2023</option>
                  <option value="202302">Febrero 2023</option>
                  <option value="202303">Marzo 2023</option>
                  <option value="202304">Abril 2023</option>
                  <option value="202305">Mayo 2023</option>
                  <option value="202306">Junio 2023</option>
                  <option value="202307">Julio 2023</option>
                  <option value="202308">Agosto 2023</option>
                  <option value="202309">Septiembre 2023</option>
                  <option value="202310">Octubre 2023</option>
                  <option value="202311">Noviembre 2023</option>
                  <option value="202312">Diciembre 2023</option>

                  <option value="202401">Enero 2024</option>
                  <option value="202402">Febrero 2024</option>
                  <option value="202403">Marzo 2024</option>
                  <option value="202404">Abril 2024</option>
                  <option value="202405">Mayo 2024</option>
                  <option value="202406">Junio 2024</option>
                  <option value="202407">Julio 2024</option>
                  <option value="202408">Agosto 2024</option>
                  <option value="202409">Septiembre 2024</option>
                  <option value="202410">Octubre 2024</option>
                  <option value="202411">Noviembre 2024</option>
                  <option value="202412">Diciembre 2024</option>

                  <option value="202501">Enero 2025</option>
                  <option value="202502">Febrero 2025</option>
                  <option value="202503">Marzo 2025</option>
                  <option value="202504">Abril 2025</option>
                  <option value="202505">Mayo 2025</option>
                  <option value="202506">Junio 2025</option>
                  <option value="202507">Julio 2025</option>
                  <option value="202508">Agosto 2025</option>
                  <option value="202509">Septiembre 2025</option>
                  <option value="202510">Octubre 2025</option>
                  <option value="202511">Noviembre 2025</option>
                  <option value="202512">Diciembre 2025</option>
                </select>
              </div>

              {/* ARCHIVO */}
              <div>
                <label
                  htmlFor="file"
                  className="block font-medium text-black mb-1"
                >
                  Archivo de reporte (.json):
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    accept=".json"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file"
                    className="flex-grow text-gray-500 bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 truncate"
                  >
                    {selectedFile
                      ? selectedFile.name
                      : "Seleccionar archivo..."}
                  </label>
                  <button
                    type="button"
                    className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
                    onClick={() => document.getElementById("file").click()}
                  >
                    <Upload size={16} className="mr-1" /> Examinar
                  </button>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                >
                  <X size={16} className="mr-1" /> Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 flex items-center"
                  disabled={!selectedFile || !selectedPeriodo}
                >
                  <FileText size={16} className="mr-1" /> Enviar Reporte
                </button>
              </div>
            </form>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-red-900 mb-4">
                Historial de reportes
              </h3>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={reportes}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10]}
                  disableRowSelectionOnClick
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#60003b] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Servicio de Administración Tributaria | Av. Hidalgo 77, Col.
            Guerrero, Ciudad de México
          </p>
          <p className="text-xs mt-1">Controles Volumétricos | Versión 2.5.0</p>
        </div>
      </footer>
    </div>
  );
}