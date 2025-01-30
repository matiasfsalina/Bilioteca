// ActualizarReservaModal.jsx
import React, { useState } from "react";
import axios from "axios";

const ActualizarReservaModal = ({ closeModal }) => {
  const [reservaId, setReservaId] = useState("");
  const [formData, setFormData] = useState({
    id_libros: "",
    id_lectores: "",
    fecha_reserva: "",
    vencida: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/reservas/${reservaId}`,
        formData
      );
      alert(response.data.message);
      closeModal();
    } catch (error) {
      console.error("Error updating reserva:", error);
      alert("Error actualizando la reserva.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Actualizar Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ID Reserva:</label>
            <input
              type="text"
              name="id_reserva"
              value={reservaId}
              onChange={(e) => setReservaId(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ID Libro:</label>
            <input
              type="text"
              name="id_libros"
              value={formData.id_libros}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ID Lector:</label>
            <input
              type="text"
              name="id_lectores"
              value={formData.id_lectores}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fecha Reserva:</label>
            <input
              type="date"
              name="fecha_reserva"
              value={formData.fecha_reserva}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vencida"
                checked={formData.vencida}
                onChange={handleInputChange}
                className="mr-2"
              />
              Vencida
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar Reserva
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarReservaModal;