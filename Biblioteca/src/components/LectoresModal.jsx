import React, { useEffect, useState } from "react";

const LectoresModal = ({ isOpen, onClose }) => {
  const [lectores, setLectores] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch the readers data when the modal opens
      fetch("http://127.0.0.1:5000/lectores")
        .then((response) => response.json())
        .then((data) => setLectores(data))
        .catch((error) => console.error("Error fetching lectores:", error));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-3xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Lectores Registrados</h2>
          <button
            className="text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {lectores.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">ID</th>
                  <th className="border-b p-2">Nombre</th>
                  <th className="border-b p-2">Email</th>
                  <th className="border-b p-2">Estado</th>
                  <th className="border-b p-2">Deudor Contar</th>
                  <th className="border-b p-2">Suspendido Hasta</th>
                </tr>
              </thead>
              <tbody>
                {lectores.map((lector) => (
                  <tr key={lector.id}>
                    <td className="border-b p-2">{lector.id}</td>
                    <td className="border-b p-2">{lector.nombre}</td>
                    <td className="border-b p-2">{lector.email}</td>
                    <td className="border-b p-2">{lector.estado}</td>
                    <td className="border-b p-2">{lector.deudor_contar}</td>
                    <td className="border-b p-2">
                      {lector.suspendido_hasta || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay lectores registrados.</p>
          )}
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectoresModal;
