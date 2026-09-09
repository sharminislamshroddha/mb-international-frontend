import CategoryDetail from "./CategoryDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetail slug={slug} />;
}
