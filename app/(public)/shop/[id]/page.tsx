import ProductDetail from "./ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ShopDetailPage({ params }: Props) {
  const { id } = await params;

  return <ProductDetail id={id} />;
}
