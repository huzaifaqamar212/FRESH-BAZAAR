import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { priceFmt } from "../data/products.js";

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='#e0f5e4'/><text x='50%' y='52%' font-size='120' text-anchor='middle'>🥗</text></svg>`
  );

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const controls = useAnimationControls();

  const off = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = async (e) => {
    e.preventDefault();
    addToCart(product, 1);
    await controls.start({
      scale: [1, 1.18, 0.94, 1.06, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-leaf-50">
        <img
          src={product.image}
          onError={(e) => (e.currentTarget.src = FALLBACK)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-lime2 px-2.5 py-1 text-xs font-bold text-leaf-950">
            {off}% OFF
          </span>
        )}
        {product.stock <= 15 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-700">
            Only {product.stock} left
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-leaf-500">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="font-semibold leading-snug hover:text-leaf-700">
          {product.name}
        </Link>
        <p className="text-xs text-leaf-950/50">{product.unit}</p>

        <div className="mt-1 flex items-center gap-1 text-xs text-leaf-950/60">
          <span className="text-amber-500">★</span> {product.rating}
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="font-display text-lg font-bold">{priceFmt(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-leaf-950/40 line-through">{priceFmt(product.oldPrice)}</p>
            )}
          </div>
          <motion.button
            animate={controls}
            onClick={handleAdd}
            className="grid h-10 w-10 place-items-center rounded-full bg-leaf-600 text-white transition hover:bg-leaf-700"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
