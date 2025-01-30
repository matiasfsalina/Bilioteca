import { useState } from "react";
import axios from "axios";

const ActualizarPrestamoModal = ({ onClose }) => {
  const [id, setId] = useState("");
  const [datos, setDatos] = useState({
    id_libros: "",
    id_lectores: "",
    id_bibliotecarios: "",
    fecha_fin: "",
    estado: "activo",
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(`http://127.0.0.1:5000/prestamos/${id}`, datos)
      .then((response) => {
        alert("Préstamo actualizado correctamente");
        onClose();
      })
      .catch((error) => console.error("Error al actualizar el préstamo:", error));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Actualizar Préstamo</h2>

        <label className="block mb-2">
          ID del Préstamo:
          <input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          ID Libro:
          <input
            type="text"
            name="id_libros"
            value={datos.id_libros}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          ID Lector:
          <input
            type="text"
            name="id_lectores"
            value={datos.id_lectores}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          ID Bibliotecario:
          <input
            type="text"
            name="id_bibliotecarios"
            value={datos.id_bibliotecarios}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Fecha Fin:
          <input
            type="date"
            name="fecha_fin"
            value={datos.fecha_fin}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Estado:
          <select
            name="estado"
            value={datos.estado}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="activo">Activo</option>
            <option value="vencido">Vencido</option>
            <option value="devuelto">Devuelto</option>
          </select>
        </label>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Actualizar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPrestamoModal;
