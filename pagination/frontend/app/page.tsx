"use client";
import { useEffect, useState } from "react";
import { getProducts } from "./actions/product";

interface Product {
  id: string;
  name: String;
  description: String;
  price: Float16Array;
  inStock: Boolean;
  category: String;
}
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");

  const fetchProducts = async () => {
    const result = await getProducts({ page, limit });
    setProducts(result.result);
  };
  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return (
    <div>
      <div> Pagination products</div>
      <div>
        {products.map((p) => (
          <div key={p.id} className="flex gap-15">
            <div>{p.name}</div>
            <div>{p.description.substring(0, 10)}</div>
            <div>{p.price}</div>
            <div>{p.inStock ? "In stock" : "out of stock"}</div>
            <div>{p.category}</div>
          </div>
        ))}
      </div>
      <select
        value={page}
        onChange={(e) => setPage(e.target.value)}
        name="Page"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <select
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        name="limit"
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
