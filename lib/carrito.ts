
export const CLAVE_CARRITO = "elite-carrito";

export type ProductoCarrito = {
  documentId: string;
  name: string;
  price: number;
  stock: number;
  cantidad: number;
  image?: {
    url: string;
    name?: string;
    alternativeText?: string | null;
  } | null;
};

export function leerCarrito(): ProductoCarrito[] {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const datos = guardado ? JSON.parse(guardado) : [];

    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error al leer el carrito:", error);
    return [];
  }
}

export function guardarCarrito(productos: ProductoCarrito[]) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));
  window.dispatchEvent(new Event("carrito-actualizado"));
}
