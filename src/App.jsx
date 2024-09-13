import React, { useState } from 'react';
import ProductCard from './Components/ProductCard';

const productos = [
  { id: 1, nombre: 'Pizza mediana', precio: 20000, imagen: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg' },
  { id: 2, nombre: 'Super perro caliente', precio: 12000, imagen: 'https://imag.bonviveur.com/hot-dog.jpg' },
  { id: 3, nombre: 'Carne asada', precio: 28000, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTRcbhDW367581nqa69OSuQsQaP-juWrFNA&s' },
  { id: 4, nombre: 'Hamburguesa', precio: 19000, imagen: 'https://files.lafm.com.co/assets/public/styles/1x1/public/2023-09/hamburguesa.jpg?VersionId=1SWe8wdVyCzKONh1UHmMfwOvtfEmZumC&itok=mGVPWjan' },
  { id: 5, nombre: 'Bandeja paisa', precio: 35000, imagen: 'https://elrancherito.com.co/wp-content/uploads/2020/06/FotosWeb_Rancherito-01-600x600.png' },
];

const TiendaVirtual = () => {
  const [carrito, setCarrito] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState(productos); // Estado para productos filtrados
  const [terminoBusqueda, setTerminoBusqueda] = useState(''); // Estado para el término de búsqueda

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Eliminar un producto específico usando su índice
  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // Buscar producto utilizando startsWith
  const buscarProducto = () => {
    const productosFiltrados = productos.filter(producto => 
      producto.nombre.toLowerCase().startsWith(terminoBusqueda.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados); // Actualizar el estado con los productos filtrados
  };

  // Agrupar productos en el carrito por nombre y contar cuántos hay
  const productosAgrupados = carrito.reduce((acc, item) => {
    const found = acc.find((product) => product.nombre === item.nombre);
    if (found) {
      found.cantidad += 1;
    } else {
      acc.push({ ...item, cantidad: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="container">
      <h1>Mi Tienda Virtual</h1>

      {/* Barra de búsqueda */}
      <div className="busqueda">
        <input 
          type="text" 
          placeholder="Buscar producto..." 
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)} // Actualizar el término de búsqueda
        />
        <button onClick={buscarProducto}>Buscar</button> {/* Botón para buscar productos */}
      </div>

      {/* Mostrar productos filtrados */}
      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      <div className="carrito">
        <h2>Carrito</h2>
        <div className="boton-agregar">
          <p>{carrito.length} artículos</p>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </div>
        <ul className="mt-2">
          {productosAgrupados.map((item, index) => (
            <div key={index} className="carrito-item">
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                className="carrito-item-imagen"
              />
              <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
              <button onClick={() => eliminarProducto(index)}>Eliminar</button>
            </div>
          ))}
        </ul>
        <p className="carrito-total">
          Total: ${carrito.reduce((sum, item) => sum + item.precio, 0)}
        </p>
      </div>
    </div>
  );
};

export default TiendaVirtual;
