"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  leerCarrito,
  guardarCarrito,
} from "@/lib/carrito";

type ProductoCarrito = {
  documentId: string;
  name: string;
  price: number;
  stock: number;
  cantidad: number;
  image?: {
    url: string;
    name?: string;
  } | null;
};

export default function CarritoPage() {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  // Primero leemos el carrito guardado.
  

useEffect(() => {
  const actualizar = () => {
    setProductos(leerCarrito());
    setCargado(true);
  };

  actualizar();

  window.addEventListener("carrito-actualizado", actualizar);

  return () => {
    window.removeEventListener("carrito-actualizado", actualizar);
  };
}, []);
 


  const precioCOP = (precio: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio);



function cambiarCantidad(documentId: string, cantidad: number) {
  const actualizado = productos.map((producto) =>
    producto.documentId === documentId
      ? {
          ...producto,
          cantidad: Math.max(
            1,
            Math.min(cantidad, producto.stock)
          ),
        }
      : producto
  );

  guardarCarrito(actualizado);
  setProductos(actualizado);
}

  

function eliminarProducto(documentId: string) {
  const actualizado = productos.filter(
    (producto) => producto.documentId !== documentId
  );

  guardarCarrito(actualizado);
  setProductos(actualizado);
}


  const totalUnidades = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const totalPrecio = productos.reduce(
    (total, producto) =>
      total + Number(producto.price) * producto.cantidad,
    0
  );

  if (!cargado) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
        Cargando carrito...
      </main>
    );
  }

  

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-black tracking-wider">
            ÉLITE<span className="text-[#d4af37]"> STORE</span>
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-300 transition hover:text-[#d4af37]"
          >
            ← Seguir comprando
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
          Tu selección
        </p>

        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Mi carrito
        </h1>

        <p className="mb-10 text-gray-400">
          Revisa tus productos antes de continuar.
        </p>

        {productos.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#141414] px-6 py-16 text-center">
            <p className="mb-5 text-6xl">🛍️</p>

            <h2 className="mb-3 text-2xl font-bold">
              Tu carrito está vacío
            </h2>

            <p className="mb-7 text-gray-400">
              Explora nuestra colección y encuentra tu próximo estilo.
            </p>

            <Link
              href="/"
              className="inline-block rounded-xl bg-[#d4af37] px-7 py-3 font-bold text-black transition hover:bg-[#f0d675]"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {productos.map((producto) => (
                <article
                  key={producto.documentId}
                  className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#141414] p-5 sm:flex-row sm:items-center"
                >
                  <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#202020] sm:w-32">
                    {producto.image?.url ? (
                      <img
                        src={`http://localhost:1337${producto.image.url}`}
                        alt={producto.image.name || producto.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-4xl">◇</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold">
                      {producto.name}
                    </h2>

                    <p className="mt-2 font-bold text-[#d4af37]">
                      {precioCOP(Number(producto.price))}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Stock disponible: {producto.stock}
                    </p>

                    
<button
  type="button"
  onClick={() => eliminarProducto(producto.documentId)}
  className="mt-4 cursor-pointer text-sm text-red-400 transition hover:text-red-300"
>
  Eliminar producto
</button>


                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        cambiarCantidad(
                          producto.documentId,
                          producto.cantidad - 1
                        )
                      }
                      disabled={producto.cantidad <= 1}
                      className="h-10 w-10 rounded-lg border border-white/20 text-xl transition hover:border-[#d4af37] disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="w-6 text-center font-bold">
                      {producto.cantidad}
                    </span>

                    <button
                      onClick={() =>
                        cambiarCantidad(
                          producto.documentId,
                          producto.cantidad + 1
                        )
                      }
                      disabled={producto.cantidad >= producto.stock}
                      className="h-10 w-10 rounded-lg border border-white/20 text-xl transition hover:border-[#d4af37] disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <p className="min-w-28 text-right font-bold">
                    {precioCOP(
                      Number(producto.price) * producto.cantidad
                    )}
                  </p>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-white/10 bg-[#141414] p-6">
              <h2 className="mb-6 text-xl font-bold">
                Resumen de compra
              </h2>

              <div className="flex justify-between border-b border-white/10 pb-4 text-gray-400">
                <span>Productos</span>
                <span>{totalUnidades} unidad(es)</span>
              </div>

              <div className="flex justify-between py-5">
                <span className="font-bold">Total</span>
                <span className="text-xl font-black text-[#d4af37]">
                  {precioCOP(totalPrecio)}
                </span>
              </div>

              <button
                onClick={() =>
                  alert(
                    "El carrito está listo. En el siguiente paso conectaremos el proceso de compra."
                  )
                }
                className="w-full rounded-xl bg-[#d4af37] px-5 py-4 font-black text-black transition hover:bg-[#f0d675]"
              >
                CONTINUAR COMPRA
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                El envío y la confirmación del pedido se configurarán
                en el siguiente paso.
              </p>
            </aside>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Élite Store. Todos los derechos reservados.
      </footer>
    </main>
  );
}
