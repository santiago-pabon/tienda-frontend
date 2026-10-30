
const STRAPI_URL =
  process.env.STRAPI_URL || "http://localhost:1337";

// TODO 10: tipos de datos de Strapi

export type StrapiImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: StrapiImage | null;
};

// TODO 11: construir la URL completa de una imagen

export function getImageUrl(path: string): string {
  if (path.startsWith("/")) {
    return `${STRAPI_URL}${path}`;
  }

  return path;
}

// TODO 12: obtener todos los productos

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?populate=image`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener los productos: ${response.status}`
    );
  }

  const json = await response.json();

  return json.data as Product[];
}

// TODO 13: obtener un producto por su slug

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=image`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener el producto: ${response.status}`
    );
  }

  const json = await response.json();

  const products = json.data as Product[];

  return products.length > 0 ? products[0] : null;
}
