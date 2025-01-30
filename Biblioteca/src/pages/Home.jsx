import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import fondoBiblioteca from "../assets/fondo_biblioteca.jpg";

const Home = () => {
  const [category, setCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  
  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/libros?search=${(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error("Error al buscar libros");
      }
  
      const data = await response.json();
      setBooks(data); // Actualiza la lista con los libros encontrados
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
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

        {/* Mostrar resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book) => (
                    <div key={book.id} className="border p-4 rounded-lg shadow">
                      <h2 className="font-bold text-lg">{book.titulo}</h2>
                      <p><strong>ID:</strong> {book.id}</p>
                      <p><strong>Autor:</strong> {book.autor}</p>
                      <p><strong>Editorial:</strong> {book.editorial}</p>
                      <p><strong>Año:</strong> {book.anio_publicacion}</p>
                      <p><strong>Cantidad disponible:</strong> {book.cantidad_disponible}</p>
                      <p><strong>Cantidad total:</strong> {book.cantidad_total}</p>
                      {book.categoria && <p><strong>Categoría:</strong> {book.categoria}</p>}
                      {book.etiquetas && book.etiquetas.length > 0 && (
                        <p><strong>Etiquetas:</strong> {book.etiquetas.join(", ")}</p>
                      )}
                    </div>
                  ))}
                </div>
       
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


