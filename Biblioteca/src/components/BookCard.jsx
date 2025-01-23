import React from "react";

const BookCard = ({ libro }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{libro.titulo}</h2>
      <p className="text-gray-600 mb-2">Autor: {libro.autor}</p>
      <p className="text-gray-600 mb-2">Editorial: {libro.editorial}</p>
      <p className="text-gray-600 mb-2">Año: {libro.anio_publicacion}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Reservar
      </button>
    </div>
  );
};

export default BookCard;

