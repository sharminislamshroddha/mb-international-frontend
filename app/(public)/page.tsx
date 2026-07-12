import Container from "@/components/layout/Container";

export default function HomePage() {
  return (
    <main>
      <Container>
        <div className="py-20">
          <h1 className="text-5xl font-bold">
            Welcome to M&B International
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Your trusted destination for premium products.
          </p>
        </div>
      </Container>
    </main>
  );
}