import AgregarAlCarrito from "@/components/agregar-al-carrito";
import Link from "next/link";
import { notFound } from "next/navigation";

const STRAPI_URL =
  process.env.STRAPI_URL || "http://localhost:1337";

type Producto = {
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  image?: {
    url: string;
    name?: string;
  } | null;
};

async function obtenerProducto(slug: string): Promise<Producto | null> {
  const respuesta = await fetch(
    `${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`,
    { cache: "no-store" }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con Strapi.");
  }

  const resultado = await respuesta.json();
  const producto = resultado.data?.[0];

  if (!producto) {
    return null;
  }

  const imagen = producto.image;

  return {
    documentId: producto.documentId,
    name: producto.name,
    slug: producto.slug,
    description: producto.description,
    price: Number(producto.price),
    stock: Number(producto.stock),
    image: imagen
      ? {
          url: imagen.url,
          name: imagen.name,
        }
      : null,
  };
}

function formatoPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}

export default async function DetalleProducto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);

  if (!producto) {
    notFound();
  }

  const imagenUrl = producto.image?.url
    ? producto.image.url.startsWith("http")
      ? producto.image.url
      : `${STRAPI_URL}${producto.image.url}`
    : null;

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <header className="border-b border-white/10 bg-[#090909]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-black tracking-wider">
            ÉLITE<span className="text-[#d4af37]"> STORE</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#141414] p-6 md:p-10">
          {imagenUrl ? (
            <img
              src={imagenUrl}
              alt={producto.image?.name || producto.name}
              className="h-[320px] w-full object-contain md:h-[460px]"
            />
          ) : (
            <div className="flex h-[320px] items-center justify-center text-gray-500">
              Imagen no disponible
            </div>
          )}
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            Estilo que te representa
          </p>

          <h1 className="mb-5 text-4xl font-black md:text-6xl">
            {producto.name}
          </h1>

          <p className="mb-8 leading-8 text-gray-400">
            {producto.description ||
              "Descubre este producto de nuestra colección Élite Store."}
          </p>

          <div className="mb-8 rounded-2xl border border-white/10 bg-[#141414] p-6">
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              Precio
            </p>

            <p className="text-4xl font-black text-[#d4af37]">
              {formatoPrecio(producto.price)}
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-gray-300">
                Disponibilidad:{" "}
                <span className={producto.stock > 0 ? "text-green-400" : "text-red-400"}>
                  {producto.stock > 0
                    ? `${producto.stock} unidad(es)`
                    : "Agotado"}
                </span>
              </p>
            </div>
          </div>

          
<AgregarAlCarrito producto={producto} />

<Link
  href="/carrito"
  className="mt-4 block w-full rounded-xl border border-white/20 px-6 py-4 text-center font-bold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
>
  VER MI CARRITO
</Link>


          <p className="mt-5 text-center text-xs text-gray-500">
            ÉLITE STORE · Calidad, estilo y personalidad
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Élite Store. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
