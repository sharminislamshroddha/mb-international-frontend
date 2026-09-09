import ProductForm from "../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-bold">
        New Product
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Create a new product listing.
      </p>

      <ProductForm />
    </div>
  );
}
