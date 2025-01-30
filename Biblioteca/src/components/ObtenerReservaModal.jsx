// ObtenerReservaModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ObtenerReservaModal = ({ closeModal }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/reservas"); 
        const data = await response.json();

        if (Array.isArray(data)) {
          setReservas(data); //  Solo guardar si es un array
        } else {
          setReservas([]); //  Evitar errores si la respuesta no es un array
          setError("Formato de datos incorrecto");
        }
      } catch (err) {
        setError("Error al obtener las reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-xl font-bold mb-4">Reservas</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Libro ID</th>
              <th className="border p-2">Lector ID</th>
              <th className="border p-2">Fecha Reserva</th>
              <th className="border p-2">Vencida</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border">
                <td className="border p-2">{reserva.id}</td>
                <td className="border p-2">{reserva.id_libros}</td>
                <td className="border p-2">{reserva.id_lectores}</td>
                <td className="border p-2">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                <td className="border p-2">{reserva.vencida ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ObtenerReservaModal;

