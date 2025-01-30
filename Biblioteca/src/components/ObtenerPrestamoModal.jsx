import { useEffect, useState } from "react";
import axios from "axios";

const ObtenerPrestamoModal = ({ onClose }) => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/prestamos") // Ajusta la URL si es necesario
      .then((response) => setPrestamos(response.data))
      .catch((error) => console.error("Error al obtener los préstamos:", error));
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Lista de Préstamos</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Libro</th>
              <th className="border p-2">Lector</th>
              <th className="border p-2">Bibliotecario</th>
              <th className="border p-2">Fecha Inicio</th>
              <th className="border p-2">Fecha Fin</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p.id} className="border">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.libro}</td>
                <td className="border p-2">{p.lector}</td>
                <td className="border p-2">{p.bibliotecario}</td>
                <td className="border p-2">{p.fecha_inicio}</td>
                <td className="border p-2">{p.fecha_fin}</td>
                <td className="border p-2">{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4"></div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ObtenerPrestamoModal;
