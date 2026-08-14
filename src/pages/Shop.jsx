import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const MAX = 2500;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const q = params.get("q") || "";
  const dealsOnly = params.get("deals") === "1";
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [sort, setSort] = useState("popular");

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.price <= maxPrice &&
        (!dealsOnly || p.tags.includes("deal")) &&
        (q === "" ||
          `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, q, dealsOnly, maxPrice, sort]);

  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Shop</h1>
          <p className="mt-1 text-sm text-leaf-950/60">
            {results.length} product{results.length !== 1 && "s"}
            {q && <> for “{q}”</>}
            {dealsOnly && " · deals only"}
          </p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input w-auto rounded-full"
          aria-label="Sort products"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Top rated</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-leaf-100 bg-leaf-50/50 p-5 lg:sticky lg:top-28">
          <h2 className="font-display font-bold">Filters</h2>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-leaf-950/50">Search</p>
            <input
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
              className="input mt-2"
              placeholder="e.g. rice, chai, eggs"
            />
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-leaf-950/50">Category</p>
            <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {[{ id: "all", name: "All products", emoji: "🛒" }, ...CATEGORIES].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setParam("category", c.id)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm font-medium transition lg:rounded-xl ${
                    category === c.id
                      ? "bg-leaf-600 text-white"
                      : "bg-white text-leaf-900 hover:bg-leaf-100"
                  }`}
                >
                  <span>{c.emoji}</span> {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-leaf-950/50">
              Max price — Rs. {maxPrice.toLocaleString()}
              {maxPrice === MAX && "+"}
            </p>
            <input
              type="range"
              min="100"
              max={MAX}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="mt-3 w-full accent-leaf-600"
              aria-label="Maximum price"
            />
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={dealsOnly}
              onChange={(e) => setParam("deals", e.target.checked ? "1" : "")}
              className="h-4 w-4 accent-leaf-600"
            />
            Deals only 🔥
          </label>
        </aside>

        {/* Grid */}
        {results.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-dashed border-leaf-200 py-24 text-center">
            <div>
              <p className="text-4xl">🧺</p>
              <p className="mt-3 font-display text-xl font-bold">Nothing matches these filters</p>
              <p className="mt-1 text-sm text-leaf-950/60">Try a wider price range or clear the search.</p>
            </div>
          </div>
        ) : (
          <motion.div
            key={`${category}-${q}-${dealsOnly}-${sort}`}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
          >
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        )}
      </div>
    </div>
  );
}
