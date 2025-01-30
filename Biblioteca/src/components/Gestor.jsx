import React, { useState, useEffect } from "react";
import logo from "../assets/logo_upateco.png";
import axios from "axios";
import fondoBiblioteca from "../assets/fondo_biblioteca.jpg";
import { handleLogout } from "../utils/auth";
import { getCurrentUser } from "../api/api";
import LectoresModal from "../components/LectoresModal";
import ObtenerPrestamoModal from "../components/ObtenerPrestamoModal";
import ActualizarPrestamoModal from "../components/ActualizarPrestamoModal";
import ObtenerReservaModal from "../components/ObtenerReservaModal";
import ActualizarReservaModal from "../components/ActualizarReservaModal";
import ObtenerDevolucionModal from "../components/ObtenerDevolucionModal";
import ActualizarDevolucionModal from "../components/ActualizarDevolucionModal";
import CreateBookModal from "../components/CreateBookModal";
import UpdateBookModal from "../components/UpdateBookModal";
import DeleteBookModal from "../components/DeleteBookModal";

const Gestor = () => {
  const [modalType, setModalType] = useState(null); // Track which modal is open
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "",id_libros: "", id_lectores: "", fecha_reserva: "", }); // lecotres registrar
  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]); // Estado para los libros
  const [isModalOpen, setIsModalOpen] = useState(false);  // modal lectores registrados
  const closeModal = () => setModalType(null);

  // libros
  useEffect(() => {
    // Carga inicial de todos los libros
    fetchBooks();
  }, []);

  // Obtener libros al cargar el componente o al buscar
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/libros?search=${searchQuery}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  // libros
  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(); // Buscar libros según la query
  };


  // Mostrar los datos del usuario
  const handleShowUser = async () => {
    try {
      const data = await getCurrentUser();
      setUserData(data); // Guarda los datos en el estado
      setShowUserModal(true); // Muestra el modal
    } catch (error) {
      console.error(error);
      alert("Error al obtener los datos del usuario");
    }
  };

  // lectores registrar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // lectores registrar
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/lectores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          estado: "activo",
        }),
      });
  
      if (response.ok) {
        // Intenta procesar solo si hay contenido
        const contentType = response.headers.get("Content-Type");
        let result = null;
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
          alert("Lector registrado con éxito");
          localStorage.setItem("lectorID", result.id_lectores);
        } else {
          alert("Lector registrado con éxito (sin datos adicionales).");
        }
  
        setFormData({ nombre: "", email: "", password: "" });
        setModalType(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al registrar lector:", error);
      alert("Ocurrió un error al registrar el lector.");
    }
  };
  

  //  prestamos
  const handleSubmitLector = async (type) => {
    if (type === "prestamos") {
      // Validar que todos los campos estén completos
      if (!formData.libro_id || !formData.lector_id || !formData.fecha_fin) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Validar que los IDs sean números positivos
      if (formData.libro_id <= 0 || formData.lector_id <= 0) {
        alert("El ID del libro y del lector deben ser números positivos.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/prestamos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_libros: formData.libro_id,
            id_lectores: formData.lector_id,
            id_bibliotecarios: 1, // Cambiar según el bibliotecario actual
            fecha_fin: formData.fecha_fin, // Puedes usar un campo de entrada para esta fecha
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message); // Mostrar mensaje de éxito
          setFormData({}); // Limpiar el formulario
          setModalType(null); // Cerrar el modal
        } else {
          const error = await response.json();
          alert(error.error || "Error al registrar el préstamo");
        }
      } catch (err) {
        console.error(err);
        alert("Error al conectar con el servidor");
      }
    }
  };

  //devoluciones
  const handleSubmitdevolucion = async (type) => {
    if (type === "devoluciones") {
      // Validar que el ID del préstamo esté presente
      if (!formData.id_prestamos) {
        alert("Por favor, ingresa el ID del préstamo.");
        return;
      }
  
      try {
        const response = await fetch("http://127.0.0.1:5000/devoluciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_prestamos: formData.id_prestamos,
            id_bibliotecarios: 1, // Reemplazar con el ID del bibliotecario
            fecha: new Date().toISOString(),
            //fecha : new Date().toISOString().split(".")[0].replace("T", " "),  //fecha: new Date().toISOString(), // Fecha actual
            comentario: formData.comentario || null,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message); // Mostrar mensaje de éxito
          setFormData({}); // Limpiar el formulario
          setModalType(null); // Cerrar el modal
        } else {
          const error = await response.json();
          alert(error.error || "Error al registrar la devolución.");
        }
      } catch (err) {
        console.error(err);
        alert("Error al conectar con el servidor.");
      }
    }
  };

  //reserva
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReserva = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Reserva creada exitosamente.");
        setModalType(null); // Cerrar el modal
        setFormData({ id_libros: "", id_lectores: "", fecha_reserva: "" }); // Resetear formulario
      } else {
        alert("Error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la solicitud.");
    }
  };
  
  return (
    <div className="container mx-auto mt-8">

        {/* Contenido principal */}
        <main className="min-h-screen flex flex-col">

          {/* Icono a la izquierda */}
          <div className="flex items-center">
            <img src={logo} alt="Icono" className="w-25 h-10 mr-3" />
          </div>
          {/* Botones */}
          <div>
            <button
              className="mr-4 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleShowUser}
            >
              Usuario
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        

                {/* Imagen destacada */}
                <div className="relative w-full h-20 sm:h-40 overflow-hidden mb-6">
                  <img
                    src={fondoBiblioteca}
                    alt="Fondo de biblioteca"
                    className="w-full h-full object-cover"
        
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-4xl font-bold">
                      Gestor de Biblioteca
                    </h1>
                  </div>
                </div>

                {/*  Botones */}
                <div className="space-y-4">
                  {/* Fila 1 */}
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("lector")}
                    >
                      Registrar Lector
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Lectores Registrados
                    </button>
                  </div>

                  {/* Fila 2 */}
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("prestamo")}
                    >
                      Prestamo
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => {setModalType("obtenerPrestamo");}}
                    >
                      Obtener Prestamo
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => {setModalType("actualizarPrestamo");}}
                    >
                      Actualizar Prestamo
                    </button>

                    {modalType === "obtenerPrestamo" && <ObtenerPrestamoModal onClose={() => setModalType(null)} />}
                    {modalType === "actualizarPrestamo" && <ActualizarPrestamoModal onClose={() => setModalType(null)} />}

                  </div>

                  {/* Fila 3 */}
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("reserva")}
                    >
                      Reserva
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("obtenerReserva")}
                    >
                      Obtener Reserva
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("actualizarReserva")}
                    >
                      Actualizar Reserva
                    </button>

                    {modalType === "obtenerReserva" && <ObtenerReservaModal closeModal={closeModal} />}
                    {modalType === "actualizarReserva" && <ActualizarReservaModal closeModal={closeModal} />}

                  </div>

                  {/* Fila 4 */}
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("devolucion")}
                    >
                      Devolución
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("obtenerDevolucion")}
                    >
                      Obtener Devolución
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("actualizarDevolucion")}
                    >
                      Actualizar Devolución
                    </button>

                    {modalType === "obtenerDevolucion" && (<ObtenerDevolucionModal onClose={() => setModalType(null)} />)}
                    {modalType === "actualizarDevolucion" && (<ActualizarDevolucionModal closeModal={() => setModalType(null)} />)}

                  </div>

                  {/* Fila 5 */}
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("create")}
                    >
                      Crear libros
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("update")}
                    >
                      Actualizar libro
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => setModalType("delete")}
                    >
                      Eliminar libro ID
                    </button>

                    {modalType === "create" && <CreateBookModal onClose={() => setModalType(null)} onBookCreated={() => {}} />}
                    {modalType === "update" && <UpdateBookModal onClose={() => setModalType(null)} book={selectedBook} onBookUpdated={() => {}} />}
                    {modalType === "delete" && <DeleteBookModal onClose={() => setModalType(null)} bookId={selectedBook?.id} onBookDeleted={() => {}} />}

                  </div>
                </div>
  
                  {/* Modal del bibliotecario */}
                  {showUserModal && userData &&(
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg">
                              <h2 className="text-xl font-bold mb-4">Información del Usuario</h2>
                              {userData ? (
                                  <div>
                                      <p><strong>Nombre:</strong> {userData.nombre}</p>
                                      <p><strong>Email:</strong> {userData.email}</p>
                                      <p><strong>Estado:</strong> {userData.estado}</p>
                                  </div>
                              ) : (
                                  <p>Cargando datos...</p>
                              )}
                              <button
                                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                  onClick={() => setShowUserModal(false)}
                              >
                                  Cerrar
                              </button>
                          </div>
                      </div>
                  )}


                  {/* Campo de búsqueda */}
                  <form
                    onSubmit={handleSearch}
                    className="flex flex-wrap items-center gap-4 mb-6 sm:gap-2 p-6"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Buscar un libro..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Buscar
                    </button>
                  </form>

                  {/* Mostrar resultados */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book) => (
                    <div key={book.id} className="border p-4 rounded-lg shadow">
                      <h2 className="font-bold text-lg">{book.titulo}</h2>
                      <p><strong>ID:</strong> {book.id}</p>
                      <p><strong>Autor:</strong> {book.autor}</p>
                      <p><strong>Editorial:</strong> {book.editorial}</p>
                      <p><strong>Año:</strong> {book.anio_publicacion}</p>
                      <p><strong>Cantidad disponible:</strong> {book.cantidad_disponible}</p>
                      <p><strong>Cantidad total:</strong> {book.cantidad_total}</p>
                      {book.categoria && <p><strong>Categoría:</strong> {book.categoria}</p>}
                      {book.etiquetas && book.etiquetas.length > 0 && (
                        <p><strong>Etiquetas:</strong> {book.etiquetas.join(", ")}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mostrar lectores registrados */}
                <LectoresModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />

                {/* Modal prestamos */}
                {modalType === "prestamo" && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white w-1/3 rounded-lg shadow-lg p-6">
                      <h2 className="text-2xl font-bold mb-4">Registrar Préstamo</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmitLector("prestamos");
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium">
                          ID del Libro
                          <input
                            type="number"
                            name="libro_id"
                            placeholder="ID del Libro"
                            value={formData.libro_id || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                          />
                        </label>
                        <label className="block mb-2 text-sm font-medium">
                          ID del Lector
                          <input
                            type="number"
                            name="lector_id"
                            placeholder="ID del Lector"
                            value={formData.lector_id || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                          />
                        </label>
                        <label className="block mb-2 text-sm font-medium">
                          Fecha de Finalización
                          <input
                            type="date"
                            name="fecha_fin"
                            value={formData.fecha_fin || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                          />
                        </label>
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded mr-2 hover:bg-gray-600"
                            onClick={() => setModalType(null)}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Registrar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Modal prestamos */}
                {modalType === "devolucion" && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white w-1/3 rounded-lg shadow-lg p-6">
                      <h2 className="text-2xl font-bold mb-4">Registrar Devolución</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmitdevolucion("devoluciones");
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium">
                          ID del Préstamo
                          <input
                            type="number"
                            name="id_prestamos"
                            placeholder="ID del Préstamo"
                            value={formData.id_prestamos || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                          />
                        </label>
                        <label className="block mb-2 text-sm font-medium">
                          Comentario (Opcional)
                          <textarea
                            name="comentario"
                            placeholder="Comentario"
                            value={formData.comentario || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mt-1"
                          />
                        </label>
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded mr-2 hover:bg-gray-600"
                            onClick={() => setModalType(null)}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Registrar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                
                {/* Modal reserva*/}
                {modalType === "reserva" && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                      <h2 className="text-lg font-bold mb-4">Reservar un Libro</h2>
                      <form onSubmit={handleSubmitReserva}>
                        <div className="mb-4">
                          <label htmlFor="id_libros" className="block font-medium">
                            ID del Libro
                          </label>
                          <input
                            type="text"
                            id="id_libros"
                            name="id_libros"
                            value={formData.id_libros}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="id_lectores" className="block font-medium">
                            ID del Lector
                          </label>
                          <input
                            type="text"
                            id="id_lectores"
                            name="id_lectores"
                            value={formData.id_lectores}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="fecha_reserva" className="block font-medium">
                            Fecha de Reserva
                          </label>
                          <input
                            type="datetime-local"
                            id="fecha_reserva"
                            name="fecha_reserva"
                            value={formData.fecha_reserva}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setModalType(null)}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                          >
                            Reservar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Modal registar lector*/}
                {modalType === "lector" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-center mb-4">Registrar Lector</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    
                      <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => setModalType(null)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                          Registrar
                        </button>
                      </div>
                    </form>
                    </div>
                  </div>
                )}     

                
                   
        </main>
    </div>
  );
};

export default Gestor;
