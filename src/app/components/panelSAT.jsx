"use client";
import { useState, useEffect } from "react";
import { Facebook, Twitter, ChevronLeft, ChevronRight } from "lucide-react";

export default function ControlesVolumetricos() {
  const [userId, setUserId] = useState("MWH571218QD9");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos para el carrusel
  const slides = [
    {
      id: 1,
      title: "Declaración Anual 2024",
      description: "Fechas límite y nuevos formatos para contribuyentes",
      color: "bg-green-100",
    },
    {
      id: 2,
      title: "Declaración Anual 2024",
      description: "Fechas límite y nuevos formatos para contribuyentes",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Declaración Anual 2024",
      description: "Fechas límite y nuevos formatos para contribuyentes",
      color: "bg-green-100",
    },
    {
      id: 4,
      title: "Declaración Anual 2024",
      description: "Fechas límite y nuevos formatos para contribuyentes",
      color: "bg-green-100",
    },
  ];

  // Autorotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Funciones para navegar el carrusel
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-burgundy-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <div className=" p-1 rounded">
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
              <a href="/enviar" className="text-white hover:underline">
                Enviar
              </a>
              <a href="/consulta" className="text-white hover:underline">
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
            Trámite
          </a>
          <span className="text-gray-600">›</span>
          <span className="text-gray-600">Inicio</span>
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
        <br />

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-black">Bienvenido</h2>
          <div className="h-1 bg-yellow-500 w-full mt-2"></div>
        </div>

        {/* Carousel */}
        <div className="border border-gray-300 bg-white mb-8">
          <div className="relative h-64">
            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute top-0 left-0 w-full h-full flex transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div
                  className={`w-1/2 ${slide.color} flex items-center justify-center p-8`}
                >
                  <img
                    src={`/declaracionanual.svg`}
                    alt={`Slide ${slide.id}`}
                    className="max-h-48 max-w-full object-contain shadow-md"
                  />
                </div>
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center text-black">
                  <h3 className="text-2xl font-bold text-burgundy-800 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-lg mb-4">{slide.description}</p>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Más información <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-burgundy-800" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

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
          {" "}
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
