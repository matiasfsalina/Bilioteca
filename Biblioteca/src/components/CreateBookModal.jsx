import { useState } from "react";

const CreateBookModal = ({ onClose, onBookCreated }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    isbn: "",
    autor: "",
    editorial: "",
    anio_publicacion: "",
    cantidad_total: "",
    cantidad_disponible: "",
    id_categorias: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/libros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onBookCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error al crear el libro:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Crear Libro</h2>
        <form onSubmit={handleSubmit}>
          {["titulo", "isbn", "autor", "editorial", "anio_publicacion", "cantidad_total", "cantidad_disponible", "id_categorias"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          ))}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookModal;
