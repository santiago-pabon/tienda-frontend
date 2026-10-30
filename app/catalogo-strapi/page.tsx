import { getProducts } from "@/lib/strapi";
import { ProductCard } from "@/components/product-card";

export default async function CatalogoStrapiPage() {
  const products = await getProducts();
  console.log(
  "Imágenes recibidas de Strapi:",
  JSON.stringify(
    products.map((product) => ({
      name: product.name,
      image: product.image,
    })),
    null,
    2
  )
);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Catálogo conectado con Strapi
      </h1>

      {products.length === 0 ? (
        <p>No hay productos publicados en Strapi.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.documentId}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}