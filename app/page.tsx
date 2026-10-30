
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { leerCarrito, guardarCarrito } from "@/lib/carrito";

type Producto = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image?: {
  url: string;
  name?: string;
  alternativeText?: string | null;
  formats?: {
    small?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
  };
} | null;
};

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(
          "http://localhost:1337/api/products?populate=image"
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const resultado = await respuesta.json();
        setProductos(resultado.data ?? []);
      } catch (err) {
        console.error(err);
        setError(
          "No pudimos cargar los productos. Comprueba que Strapi esté funcionando."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  


function agregarAlCarrito(producto: Producto) {
  if (!producto || Number(producto.stock) <= 0) {
    alert("Este producto no está disponible.");
    return;
  }

  try {
    const carrito = leerCarrito();

    const existente = carrito.find(
      (item) => item.documentId === producto.documentId
    );

    if (existente) {
      if (existente.cantidad >= Number(producto.stock)) {
        alert("No hay más unidades disponibles de este producto.");
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
        image: producto.image
          ? {
              url: producto.image.url,
              name: producto.image.name,
              alternativeText: producto.image.alternativeText,
            }
          : null,
      });
    }

    guardarCarrito(carrito);
    alert(`${producto.name} se agregó al carrito.`);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    alert("No se pudo guardar el producto.");
  }
}

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white">
      {/* Barra de navegación */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-2xl font-black tracking-wider">
            ÉLITE<span className="text-amber-400">.</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm text-gray-300">
            <a href="#inicio" className="transition hover:text-amber-400">
              Inicio
            </a>
            <a href="#catalogo" className="transition hover:text-amber-400">
              Catálogo
            </a>
            
<Link href="/carrito">
  🛒 Mi carrito
</Link>

          </nav>
        </div>
      </header>

      {/* Portada */}
      <section
        id="inicio"
        className="relative overflow-hidden border-b border-white/10"
      >
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-amber-400">
              Estilo que habla por ti
            </p>

            <h1 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
              Viste diferente.
              <span className="mt-2 block text-amber-400">
                Marca tu estilo.
              </span>
            </h1>

            <p className="mt-6 max-w-lg leading-7 text-gray-400">
              Descubre nuestra colección de prendas, accesorios y productos
              para completar tu estilo todos los días.
            </p>

            <a
              href="#catalogo"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 font-bold text-black transition hover:bg-amber-300"
            >
              Explorar catálogo <span className="ml-2">→</span>
            </a>
          </div>

          <div className="flex min-h-64 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#242426] to-[#101012] p-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-gray-400">
                Colección
              </p>
              <p className="mt-3 text-5xl font-black tracking-widest sm:text-6xl">
                ÉLITE
              </p>
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-amber-400" />
              <p className="mt-5 text-sm text-gray-400">
                Encuentra tu próximo favorito
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              Selección para ti
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              Nuestro catálogo
            </h2>
            <p className="mt-3 text-gray-400">
              Encuentra productos que combinan contigo.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <label
              htmlFor="buscador"
              className="mb-2 block text-sm text-gray-300"
            >
              Buscar por nombre
            </label>
            <div className="flex items-center rounded-xl border border-white/10 bg-[#151518] px-4 transition focus-within:border-amber-400">
              <span className="mr-3 text-gray-500">⌕</span>
              <input
                id="buscador"
                type="text"
                placeholder="Ej. camiseta, gorra, reloj..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda("")}
                  className="ml-2 text-sm text-gray-400 hover:text-white"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {!cargando && !error && (
          <p className="mt-8 text-sm text-gray-500">
            {productosFiltrados.length} productos encontrados
          </p>
        )}

        {cargando && (
          <p className="py-16 text-center text-gray-400">
            Cargando colección...
          </p>
        )}

        {error && (
          <p className="mt-8 rounded-xl border border-red-900 bg-red-950/40 p-5 text-red-300">
            {error}
          </p>
        )}

        {!cargando && !error && productos.length === 0 && (
          <p className="py-16 text-center text-gray-400">
            Todavía no hay productos publicados.
          </p>
        )}

        {!cargando &&
          !error &&
          productos.length > 0 &&
          productosFiltrados.length === 0 && (
            <div className="my-10 rounded-2xl border border-white/10 bg-[#151518] px-5 py-12 text-center">
              <p className="text-xl font-bold">No encontramos resultados</p>
              <p className="mt-2 text-gray-400">
                Prueba con otro nombre de producto.
              </p>
              <button
                onClick={() => setBusqueda("")}
                className="mt-5 rounded-full bg-amber-400 px-5 py-2.5 font-semibold text-black hover:bg-amber-300"
              >
                Ver todos los productos
              </button>
            </div>
          )}

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <article
              key={producto.documentId}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141416] transition duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-black/30"
            >
              <Link
               href={`/productos/${producto.slug}`}
                className="block"
                aria-label={`Ver detalles de ${producto.name}`}
              >
          
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#1c1c20] p-5">
  {producto.image?.url ? (
  <img
    src={`http://localhost:1337${
      producto.image.formats?.small?.url ??
      producto.image.formats?.thumbnail?.url ??
      producto.image.url
    }`}
    alt={producto.image.alternativeText ?? producto.name}
    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
  />
) : (
  <span className="text-6xl">🛍️</span>
)}

                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-gray-200">
                    Élite selection
                  </span>
                </div>
              </Link>

              <div className="p-5">
                <h3 className="text-lg font-bold transition group-hover:text-amber-400">
                  {producto.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                  {producto.description}
                </p>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Precio</p>
                    <p className="mt-1 text-2xl font-black text-amber-400">
                      {new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
}).format(Number(producto.price))}
                    </p>
                  </div>

                  <p
                    className={`text-xs ${
                      producto.stock > 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {producto.stock > 0
                      ? `${producto.stock} disponibles`
                      : "Agotado"}
                  </p>
                </div>

                <button
  onClick={() => agregarAlCarrito(producto)}
  disabled={producto.stock <= 0}
  className="mt-3 w-full rounded-xl bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-[#f0d675] disabled:cursor-not-allowed disabled:opacity-40"
>
  {producto.stock > 0 ? "Agregar al carrito" : "Agotado"}
</button>

                <Link
                  href={`/productos/${producto.slug}`}
                  className="mt-6 block rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
                >
                  Ver detalles <span className="ml-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pie de página */}
      <footer className="border-t border-white/10 bg-[#080809]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-bold tracking-widest text-white">
            ÉLITE<span className="text-amber-400">.</span>
          </p>
          <p>Estilo, calidad y personalidad.</p>
          <p>© 2026 Élite. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
