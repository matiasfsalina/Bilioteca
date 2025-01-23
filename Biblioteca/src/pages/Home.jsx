import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import fondoBiblioteca from "../assets/fondo_biblioteca.jpg";

const Home = () => {
  const [category, setCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Buscando: ${searchQuery}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="min-h-screen flex flex-col">
        {/* Imagen destacada */}
        <div className="relative w-full h-20 sm:h-40 overflow-hidden mb-6">
          <img
            src={fondoBiblioteca}
            alt="Fondo de biblioteca"
            className="w-full h-full object-cover"

          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-2xl sm:text-4xl font-bold">
              Biblioteca
            </h1>
          </div>
        </div>
        {/* Campo de búsqueda */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-4 mb-6 sm:gap-2 p-6"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar un libro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>


        {/* Filtros por categoría */}
        <Filters setCategory={setCategory} />

        {/* Lista de libros */}
        <div className="mt-6 p-6">
          <BookList category={category} currentPage={currentPage} />
        </div>

        {/* Paginación */}
        <div className="mt-6">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </main>
    </div>
  );
};

export default Home;


