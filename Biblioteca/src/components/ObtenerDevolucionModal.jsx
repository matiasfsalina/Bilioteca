import React, { useEffect, useState } from "react";

const ObtenerDevolucionModal = ({ onClose }) => {
  const [devoluciones, setDevoluciones] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/devoluciones")
      .then((res) => res.json())
      .then((data) => {
        // Agrupar por fecha
        const groupedByDate = data.reduce((acc, devolucion) => {
          const { fecha } = devolucion;
          if (!acc[fecha]) acc[fecha] = [];
          acc[fecha].push(devolucion);
          return acc;
        }, {});

        // Ordenar fechas de más recientes a más antiguas
        const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

        setDevoluciones(sortedDates.map(date => ({ date, items: groupedByDate[date] })));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Devoluciones</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Préstamo ID</th>
              <th className="border p-2">Bibliotecario ID</th>
              <th className="border p-2">Comentario</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {devoluciones.map(({ date, items }) =>
              items.map((devolucion) => (
                <tr key={devolucion.id} className="border">
                  <td className="border p-2">{devolucion.id}</td>
                  <td className="border p-2">{devolucion.id_prestamos}</td>
                  <td className="border p-2">{devolucion.id_bibliotecarios}</td>
                  <td className="border p-2">{devolucion.comentario}</td>
                  <td className="border p-2">{date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default ObtenerDevolucionModal;

