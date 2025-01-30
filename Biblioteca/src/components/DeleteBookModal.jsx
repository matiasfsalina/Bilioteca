import { useState } from "react";

const DeleteBookModal = ({ onClose, onBookDeleted }) => {
  const [bookId, setBookId] = useState("");

  const handleChange = (e) => {
    setBookId(e.target.value);
  };

  const handleDelete = async () => {
    if (!bookId) {
      console.error("Error: Debes ingresar un ID válido");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/libros/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onBookDeleted();
        onClose();
      } else {
        console.error("Error al eliminar el libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Eliminar Libro</h2>
        <p className="mb-2">Ingrese el ID del libro que desea eliminar:</p>
        <input
          type="number"
          name="bookId"
          placeholder="ID del libro"
          value={bookId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
          <button 
            onClick={handleDelete} 
            className={`px-4 py-2 text-white rounded ${bookId ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`} 
            disabled={!bookId}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;

  