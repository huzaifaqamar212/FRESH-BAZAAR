import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { priceFmt } from "../data/products.js";

export default function Cart() {
  const { items, count, subtotal, savings, deliveryFee, total, setQty, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-x grid place-items-center py-32 text-center">
        <div>
          <p className="text-5xl">🛒</p>
          <h1 className="mt-4 font-display text-2xl font-extrabold">Your cart is empty</h1>
          <p className="mt-2 text-leaf-950/60">Fill it up with this week's fresh picks.</p>
          <Link to="/shop" className="btn-primary mt-6">Browse the shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-extrabold">Cart ({count})</h1>
        <button onClick={clear} className="text-sm font-semibold text-red-600 hover:text-red-700">
          Clear cart
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((i) => (
              <motion.li
                key={i.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex gap-4 rounded-2xl border border-leaf-100 bg-white p-4 shadow-card"
              >
                <Link to={`/product/${i.id}`} className="shrink-0">
                  <img src={i.image} alt={i.name} className="h-20 w-20 rounded-xl object-cover sm:h-24 sm:w-24" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${i.id}`} className="font-semibold leading-snug hover:text-leaf-700">
                        {i.name}
                      </Link>
                      <p className="text-xs text-leaf-950/50">{i.brand} · {i.unit}</p>
                    </div>
                    <button
                      onClick={() => remove(i.id)}
                      className="rounded-full p-1.5 text-leaf-950/40 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove ${i.name}`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-leaf-200">
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        className="grid h-9 w-9 place-items-center rounded-full font-bold hover:bg-leaf-50"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, Math.min(i.stock, i.qty + 1))}
                        className="grid h-9 w-9 place-items-center rounded-full font-bold hover:bg-leaf-50 disabled:opacity-40"
                        disabled={i.qty >= i.stock}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold">{priceFmt(i.price * i.qty)}</p>
                      {i.oldPrice && (
                        <p className="text-xs text-leaf-600">
                          saving {priceFmt((i.oldPrice - i.price) * i.qty)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-leaf-100 bg-leaf-50/60 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-leaf-950/60">Subtotal</dt><dd className="font-semibold">{priceFmt(subtotal)}</dd></div>
            {savings > 0 && (
              <div className="flex justify-between text-leaf-700"><dt>Deal savings</dt><dd className="font-semibold">− {priceFmt(savings)}</dd></div>
            )}
            <div className="flex justify-between">
              <dt className="text-leaf-950/60">Delivery</dt>
              <dd className="font-semibold">{deliveryFee === 0 ? "Free 🎉" : priceFmt(deliveryFee)}</dd>
            </div>
            {deliveryFee > 0 && (
              <p className="rounded-xl bg-lime2/25 px-3 py-2 text-xs font-medium text-leaf-800">
                Add {priceFmt(3000 - subtotal)} more for free delivery
              </p>
            )}
            <div className="flex justify-between border-t border-leaf-200 pt-3 text-base">
              <dt className="font-display font-bold">Total</dt>
              <dd className="font-display font-extrabold">{priceFmt(total)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="btn-primary mt-5 w-full">Proceed to checkout</Link>
          <Link to="/shop" className="mt-3 block text-center text-sm font-semibold text-leaf-600 hover:text-leaf-800">
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
