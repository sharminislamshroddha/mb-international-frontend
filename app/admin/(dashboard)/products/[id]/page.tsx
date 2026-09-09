import EditProductClient from "./EditProductClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  return <EditProductClient id={id} />;
}
