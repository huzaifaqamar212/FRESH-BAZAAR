import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { PRODUCTS, CATEGORIES, priceFmt } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const controls = useAnimationControls();

  if (!product) {
    return (
      <div className="container-x grid place-items-center py-32 text-center">
        <div>
          <p className="text-4xl">🫤</p>
          <h1 className="mt-3 font-display text-2xl font-bold">Product not found</h1>
          <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const off = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = async () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    await controls.start({
      scale: [1, 1.08, 0.96, 1.03, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  };

  return (
    <div className="container-x py-8">
      <nav className="text-sm text-leaf-950/60">
        <Link to="/" className="hover:text-leaf-700">Home</Link> ›{" "}
        <Link to={`/shop?category=${product.category}`} className="hover:text-leaf-700">{cat?.name}</Link> ›{" "}
        <span className="text-leaf-950">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl border border-leaf-100 bg-leaf-50"
        >
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          {off > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-lime2 px-3 py-1.5 text-sm font-bold text-leaf-950">
              {off}% OFF
            </span>
          )}
        </motion.div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf-500">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="rounded-full bg-leaf-100 px-3 py-1 font-medium">{product.unit}</span>
            <span className="text-amber-500">★ {product.rating}</span>
            <span className="text-leaf-950/50">{product.reviews} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-display text-3xl font-extrabold text-leaf-700">{priceFmt(product.price)}</p>
            {product.oldPrice && (
              <p className="text-lg text-leaf-950/40 line-through">{priceFmt(product.oldPrice)}</p>
            )}
          </div>

          <p className="mt-4 max-w-prose leading-relaxed text-leaf-950/70">{product.desc}</p>

          <p className={`mt-4 text-sm font-semibold ${product.stock <= 15 ? "text-amber-700" : "text-leaf-600"}`}>
            {product.stock <= 15 ? `⚠️ Only ${product.stock} left in stock` : "✓ In stock — ships today"}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-leaf-200">
              <button
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="grid h-12 w-12 place-items-center rounded-full text-xl font-bold hover:bg-leaf-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-display text-lg font-bold">{qty}</span>
              <button
                onClick={() => setQty((n) => Math.min(product.stock, n + 1))}
                className="grid h-12 w-12 place-items-center rounded-full text-xl font-bold hover:bg-leaf-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <motion.button animate={controls} onClick={handleAdd} className="btn-primary min-w-52">
              {added ? "Added to cart ✓" : `Add to cart — ${priceFmt(product.price * qty)}`}
            </motion.button>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl bg-leaf-50 p-5 text-sm sm:grid-cols-3">
            <div>🚚 <span className="font-semibold">Same-day delivery</span><p className="text-leaf-950/60">order before 6 pm</p></div>
            <div>💵 <span className="font-semibold">Cash on delivery</span><p className="text-leaf-950/60">cards accepted too</p></div>
            <div>↩️ <span className="font-semibold">Easy returns</span><p className="text-leaf-950/60">at your doorstep</p></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold">More from {cat?.name}</h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        </section>
      )}
    </div>
  );
}
