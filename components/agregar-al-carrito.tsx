
"use client";

import {
  leerCarrito,
  guardarCarrito,
} from "@/lib/carrito";

type Props = {
  producto: {
    documentId: string;
    name: string;
    price: number;
    stock: number;
    image?: {
      url: string;
      name?: string;
      alternativeText?: string | null;
    } | null;
  };
};

export default function AgregarAlCarrito({ producto }: Props) {
  function agregarAlCarrito() {
    if (producto.stock <= 0) {
      alert("Este producto no está disponible.");
      return;
    }

    try {
      const carrito = leerCarrito();

      const existente = carrito.find(
        (item) => item.documentId === producto.documentId
      );

      if (existente) {
        if (existente.cantidad >= producto.stock) {
          alert("Ya alcanzaste el stock disponible de este producto.");
          return;
        }

        existente.cantidad += 1;
      } else {
        carrito.push({
          documentId: producto.documentId,
          name: producto.name,
          price: Number(producto.price),
          stock: Number(producto.stock),
          cantidad: 1,
          image: producto.image ?? null,
        });
      }

      guardarCarrito(carrito);
      alert(`${producto.name} se agregó al carrito.`);
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
      alert("No se pudo guardar el producto.");
    }
  }

  if (producto.stock <= 0) {
    return (
      <button
        disabled
        className="block w-full cursor-not-allowed rounded-xl bg-gray-700 px-6 py-4 font-black text-gray-400"
      >
        PRODUCTO AGOTADO
      </button>
    );
  }

  return (
    <button
      onClick={agregarAlCarrito}
      className="block w-full rounded-xl bg-[#d4af37] px-6 py-4 font-black text-black transition hover:-translate-y-1 hover:bg-[#f0d675]"
    >
      AGREGAR AL CARRITO
    </button>
  );
}
