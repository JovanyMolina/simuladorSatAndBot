"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faTrash,
  faPenToSquare,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function ControlesVolumetricos() {
  const [userId] = useState("MWH571218QD9");

  // Estados para controlar los modales

  // Estado para el filtro de archivos
  const [fileFilter, setFileFilter] = useState("all"); // "all", "process", "accepted", "rejected"

  const rejectFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].status = "rejected";
    setFiles(updatedFiles);
  };

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const filteredFiles =
    fileFilter === "all"
      ? files
      : files.filter((file) => file.status === fileFilter);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    type: "",
    identifier: "",
    rfc_contributor: "",
    rfc_provider: "",
    period: "",
    installation_class: "",
    report_type: "",
    standard: "",
  });
  const [signInfo, setSignInfo] = useState({
    certificate: "",
    privateKey: "",
    password: "",
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        status: "new",
        details: { ...fileDetails },
      };
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      setCurrentFileIndex(updatedFiles.length - 1);
      setFileDetails({ ...fileDetails });
      setShowDetailModal(true);
    }
  };

  const saveFileDetails = () => {
    const updated = [...files];
    updated[currentFileIndex].details = fileDetails;
    updated[currentFileIndex].status = "process";
    setFiles(updated);
    setShowDetailModal(false);
  };

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleSend = (index) => {
    const updated = [...files];
    updated[index].status = "signing";
    setFiles(updated);
    setTimeout(() => {
      updated[index].status = "processing";
      setFiles([...updated]);
      setTimeout(() => {
        updated[index].status = Math.random() > 0.5 ? "accepted" : "rejected";
        setFiles([...updated]);
      }, 19000);
    }, 12000);
  };

  const openDetailModal = (index) => {
    setCurrentFileIndex(index);
    setFileDetails(files[index].details);
    setShowDetailModal(true);
  };

  const openSignModal = (index) => {
    setCurrentFileIndex(index);
    setShowSignModal(true);
  };

  const signFile = () => {
    const updated = [...files];
    updated[currentFileIndex].status = "processing";
    setFiles(updated);
    setShowSignModal(false);
    setTimeout(() => {
      updated[currentFileIndex].status =
        Math.random() > 0.5 ? "accepted" : "rejected";
      setFiles([...updated]);
    }, 25000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-burgundy-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <div className="p-1 rounded">
                <img
                  src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                  alt="Logo SAT"
                  className="h-10"
                />
              </div>
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
              <a
                href="/enviar"
                id="enviar"
                className="text-white hover:underline"
              >
                Enviar
              </a>
              <a
                href="/consulta"
                id="consultas"
                className="text-white hover:underline"
              >
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
          <a href="/panel" className="text-gray-600 hover:underline">
            Inicio
          </a>
          <span className="text-gray-600">›</span>
          <span className="text-gray-600">Recepción</span>
        </div>
        <div className="flex items-center">
          <span className="px-4 py-1 border border-gray-300 text-black bg-white">
            {userId}
          </span>
          <a href="#" className="text-blue-600 ml-2 hover:underline">
            Salir
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Logos */}
        <div className="flex space-x-8 items-center mb-12">
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
        {/* File selection section */}
        <div className="p-6">
          {/* Nueva sección con nuevo diseño de tabla para archivos seleccionados */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Seleccione archivo
            </h2>
            <div className="border-t-4 border-yellow-500 border-b border-gray-300 mb-4"></div>

            <label
              htmlFor="file-upload"
              className="block font-semibold text-gray-700 mb-1"
            >
              Archivo ZIP:
            </label>

            <div className="flex items-center gap-2">
              <input
                id="txtZipFile"
                name="txtZipFile"
                type="text"
                placeholder="Nombre del archivo seleccionado"
                readOnly
                value={selectedFile ? selectedFile.name : ""}
                className="flex-1 border rounded px-3 py-2 w-full text-black"
              />

              <button
                type="button"
                className="bg-pink-800 text-white px-6 py-2 rounded"
                onClick={() => document.getElementById("file-upload").click()}
              >
                Buscar
              </button>

              <input
                type="file"
                accept=".zip"
                className="hidden"
                id="file-upload"
                name="archivoZip"
                onChange={(e) => {
                  handleFileSelect(e);
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Archivos seleccionados
            </h2>
            <div className="border-t-4 border-yellow-500 border-b border-gray-300 mb-4"></div>
            <div className="border border-gray-200">
              <table className="w-full">
                <tbody>
                  {files.map((file, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="p-4 w-full">
                        <div className="font-semibold text-gray-800">
                          {file.details.identifier || file.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {file.status === "signing" && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                Firmando archivo...
                              </p>
                              <div className="relative w-full h-3 rounded overflow-hidden bg-blue-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:40px_40px] animate-progress-bar" />
                              </div>
                            </div>
                          )}

                          {file.status === "processing" &&
                            "El proceso de recepción de archivo está en proceso..."}
                          {file.status === "accepted" &&
                            "El proceso se completó con folio: 2002012928, puede descargar su acuse."}
                          {file.status === "rejected" &&
                            "El proceso de recepción fue rechazado."}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {(file.status === "process" ||
                          file.status === "new") && (
                          <button
                            id="enviar"
                            className="px-4 py-1 border border-red-700 text-red-700 text-sm "
                            onClick={() => handleSend(i)}
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            {/* Enviar */}
                          </button>
                        )}
                        {file.status === "signing" && (
                          <button
                            id="firma"
                            className="px-4 py-1 border border-red-700 text-red-700 text-sm"
                            onClick={() => openSignModal(i)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            {/* Firmar */}
                          </button>
                        )}
                        {file.status === "accepted" && (
                          <button
                            className="px-4 py-1 border border-red-700 text-red-700 text-sm"
                            onClick={() => alert("Descargando acuse...")}
                          >
                            <FontAwesomeIcon icon={faFile} />
                            {/* Acuse */}
                          </button>
                        )}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <button
                          className="px-4 py-1 border border-red-700 text-red-700 text-sm"
                          onClick={() => openDetailModal(i)}
                        >
                          <FontAwesomeIcon icon={faBars} />
                          {/* Detalles */}
                        </button>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <button
                          className="px-4 py-1 border border-red-700 text-red-700 text-sm"
                          onClick={() => handleDelete(i)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          {/* Eliminar */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal firmar */}
          {showSignModal && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Firmar archivo</h2>
                <input
                  placeholder="Ubicación del certificado"
                  className="w-full border p-2 mb-2"
                  value={signInfo.certificate}
                  onChange={(e) =>
                    setSignInfo({ ...signInfo, certificate: e.target.value })
                  }
                />
                <input
                  placeholder="Ubicación de la clave privada"
                  className="w-full border p-2 mb-2"
                  value={signInfo.privateKey}
                  onChange={(e) =>
                    setSignInfo({ ...signInfo, privateKey: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full border p-2 mb-4"
                  value={signInfo.password}
                  onChange={(e) =>
                    setSignInfo({ ...signInfo, password: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2"
                    onClick={() => setShowSignModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-purple-700 text-white px-4 py-2"
                    onClick={signFile}
                  >
                    Firmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        );
        {/* File filter tabs */}
        {/* Selected files section */}
      </main>

      {/* Modal para detalles del archivo */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/63 flex justify-center items-center z-50">
          <div className="bg-white rounded border border-gray-300 shadow-md w-full max-w-4xl">
            <div className="bg-gray-700 text-white py-2 px-4 font-medium text-center text-xl">
              Detalle del archivo
            </div>

            <div className="p-6 bg-gray-100">
              <div className="grid grid-cols-12 gap-x-4 gap-y-4">
                {/* Primera fila */}
                <div className="col-span-6 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Tipo:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    value={fileDetails.type}
                    onChange={(e) =>
                      setFileDetails({ ...fileDetails, type: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Identificador archivo:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    value={fileDetails.identifier}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        identifier: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Segunda fila */}
                <div className="col-span-6 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    RFC Contribuyente:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    value={fileDetails.rfc_contributor}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        rfc_contributor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-3 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    RFC Proveedor:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    value={fileDetails.rfc_provider}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        rfc_provider: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-3 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Periodo:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    value={fileDetails.period}
                    onChange={(e) =>
                      setFileDetails({ ...fileDetails, period: e.target.value })
                    }
                  />
                </div>

                {/* Tercera fila */}
                <div className="col-span-4 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Clave instalación:
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    rows={3}
                    value={fileDetails.installation_class}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        installation_class: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="col-span-4 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Tipo Reporte:
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    rows={3}
                    value={fileDetails.report_type}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        report_type: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="col-span-4 flex flex-col">
                  <label className="block text-base text-gray-700 mb-1">
                    Estandar:
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-800"
                    rows={3}
                    value={fileDetails.standard}
                    onChange={(e) =>
                      setFileDetails({
                        ...fileDetails,
                        standard: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end mt-8 space-x-3">
                <button
                  className="px-6 py-2 border border-gray-400 bg-gray-100 text-gray-700 rounded"
                  onClick={() => setShowDetailModal(false)}
                >
                  Cancelar
                </button>
                <button
                  id="agregar"
                  className="px-6 py-2 bg-pink-800 text-white rounded"
                  onClick={saveFileDetails}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para firmar archivo */}

      {showSignModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white border border-gray-300 shadow-md w-full max-w-2xl">
            <div className="bg-gray-600 text-white py-2 text-center text-xl font-medium">
              Firmar archivo
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700 mb-1">
                  Certificado (.cer)*:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ubicación del certificado"
                    className="flex-grow border border-gray-300 rounded px-3 py-2 text-gray-700"
                    value={signInfo.certificate}
                    onChange={(e) =>
                      setSignInfo({ ...signInfo, certificate: e.target.value })
                    }
                  />
                  <button
                    className="bg-gray-100 border border-gray-300 rounded px-4 py-1 text-gray-700"
                    onClick={() => console.log("Buscar certificado...")}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1">
                  Clave privada (.key)*:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ubicación de la llave privada"
                    className="flex-grow border border-gray-300 rounded px-3 py-2 text-gray-700"
                    value={signInfo.privateKey}
                    onChange={(e) =>
                      setSignInfo({ ...signInfo, privateKey: e.target.value })
                    }
                  />
                  <button
                    className="bg-gray-100 border border-gray-300 rounded px-4 py-1 text-gray-700"
                    onClick={() => console.log("Buscar llave...")}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1">
                  Contraseña de clave privada*:
                </label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
                  value={signInfo.password}
                  onChange={(e) =>
                    setSignInfo({ ...signInfo, password: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  className="border border-gray-300 bg-gray-100 text-gray-700 px-6 py-1 rounded"
                  onClick={() => setShowSignModal(false)}
                >
                  Cerrar
                </button>
                <button
                  id="submit"
                  className="bg-pink-800 text-white px-6 py-1 rounded"
                  onClick={signFile}
                >
                  Firmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*****************************************************************************************************************************************************************************************************************/}
      {/* Footer */}
      <footer className="bg-burgundy-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex items-center">
              <img
                src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                alt="Logo Gobierno de México"
                className="h-16"
              />
              <div className="ml-4"></div>
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
