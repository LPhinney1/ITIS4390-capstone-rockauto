"use client";
import { useState, useEffect } from "react";
import { promos } from "./placeholder-data";
import { ProductCardHome } from "./components/product-card";
import CategorySidebar from "./ui_new/sidenav";


type Category = {
  id: number;
  name: string;
};

type Part = {
  id: number;
  product_name: string;
  price: number;
  category_id: number;
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    loadCategories();
  }, []);

  // Load parts per categroy
  useEffect(() => {
    async function loadParts() {
      setLoading(true);

      let url = "/api/parts";
      if (selectedCategory !== null) {
        url = `/api/parts/categories/${selectedCategory}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        id: item.id,
        product_name: item.product_name,
        price: item.price,
        category_id: item.category_id,
      }));

      setParts(formatted);
      setLoading(false);
    }

    loadParts();
  }, [selectedCategory]);

  return (
    <main className="mx-5 flex flex-1">
      {/* LEFT SIDEBAR */}
      <CategorySidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={categories}
      />

      {/* RIGHT SIDE */}
      <div className="m-5 w-full">
        {/* CAROUSEL
        <FeaturedCarousel /> */}

        {/* GRID */}
        {loading && <p className="text-gray-500">Loading parts…</p>}

        {!loading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {parts.map((part) => (
              <ProductCardHome
                key={part.id}
                product={{
                  name: part.product_name,
                  price: part.price,
                  image: "/placeholder.png",
                }}
              />
            ))}
          </div>
        )}
        {/* PROMOTIONS */}
        <div className="mt-10 flex flex-col gap-4">
          {promos.map((p, i) => (
            <div
              key={i}
              className="flex justify-between bg-white p-5 rounded-xl shadow border"
            >
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-500">Special offer available now</p>
              </div>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm h-fit">
                {p.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
