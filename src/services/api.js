export async function obtenerProductos() {
  const res = await fetch('http://localhost:8080/tumtum/productos');
  if (!res.ok) throw new Error('Error al obtener productos');
  const data = await res.json();

  return data.map(p => ({
    id: p.idProducto.toString(),
    nombre: p.nombreProducto,
    categoria: p.categoriaProducto,
    precio: p.precioProducto,
    imagen: p.imgUrlProducto,
    stock: p.stockProducto,
    descripcion: p.descripcionProducto,
    estado: p.estadoProducto
  }));
}
