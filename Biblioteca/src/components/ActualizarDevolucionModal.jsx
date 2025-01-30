import React, { useState } from "react";

const ActualizarDevolucionModal = ({ closeModal }) => {
  const [id, setId] = useState("");
  const [idPrestamos, setIdPrestamos] = useState("");
  const [idBibliotecarios, setIdBibliotecarios] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    if (!id) {
      setError("Debe ingresar un ID de devolución");
      return;
    }

    const data = {
      id_prestamos: idPrestamos,
      id_bibliotecarios: idBibliotecarios,
      fecha: fecha || undefined,
      comentario: comentario || undefined,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/devoluciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setError(null);
      } else {
        setMessage(null);
        setError("Error al actualizar la devolución");
      }
    } catch (err) {
      setMessage(null);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Actualizar Devolución</h2>

        <input
          type="text"
          placeholder="ID de Devolución"
          className="border p-2 mb-2 w-full"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID de Préstamo"
          className="border p-2 mb-2 w-full"
          value={idPrestamos}
          onChange={(e) => setIdPrestamos(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID de Bibliotecario"
          className="border p-2 mb-2 w-full"
          value={idBibliotecarios}
          onChange={(e) => setIdBibliotecarios(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 mb-2 w-full"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <textarea
          placeholder="Comentario"
          className="border p-2 mb-2 w-full"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarDevolucionModal;
