import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  const heroImage =
    products.data.length > 0 && products.data[0].images?.length > 0
      ? products.data[0].images[0]
      : "/placeholder.png";

  return (
    <div>
      {/* Hero Section */}
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          
          {/* Hero Text */}
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>

            <Button asChild className="rounded-full px-6 py-3">
              <Link href="/products">
                Browse All Products
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <Image
              src={heroImage}
              alt="Hero Image"
              width={450}
              height={450}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      {products.data.length > 0 ? (
        <section className="py-8">
          <Carousel products={products.data} />
        </section>
      ) : (
        <section className="py-8 text-center text-neutral-500">
          No products available at the moment.
        </section>
      )}
    </div>
  );
}