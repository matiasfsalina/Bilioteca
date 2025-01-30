import { useState, useEffect } from "react";

const UpdateBookModal = ({ onClose, book= {}, onBookUpdated }) => {
  // Definir un estado inicial con todos los campos vacíos
  const initialState = {
    id: "", 
    titulo: "",
    isbn: "",
    autor: "",
    editorial: "",
    anio_publicacion: "",
    cantidad_total: "",
    cantidad_disponible: "",
    id_categorias: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Cuando `book` cambie, actualizar el estado
  useEffect(() => {
    if (book && Object.keys(book).length > 0) {
      setFormData({ ...book, id: book.id || "" });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      console.error("Error: Debes ingresar un ID válido del libro");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/libros/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onBookUpdated();
        onClose();
      }  else {
          console.error("Error al actualizar el libro:", response.statusText);
        }
      } catch (error) {
        console.error("Error al actualizar el libro:", error);
      }    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Actualizar Libro</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo para ingresar el ID del libro */}
          <input
            type="number"
            name="id"
            placeholder="ID DEL LIBRO"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          {/* Campos restantes del formulario */}
          {Object.keys(formData).map(
            (field) =>
              field !== "id" && (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
              )
          )}

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
