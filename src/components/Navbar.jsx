import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const CartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function Navbar() {
  const { count, lastAdded } = useCart();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  // re-bounce badge whenever an item is added
  const [bounceKey, setBounceKey] = useState(0);
  useEffect(() => {
    if (lastAdded) setBounceKey((k) => k + 1);
  }, [lastAdded]);

  const submit = (e) => {
    e.preventDefault();
    nav(`/shop?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  const linkCls = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? "bg-leaf-600 text-white" : "text-leaf-900 hover:bg-leaf-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100 bg-white/90 backdrop-blur">
      <div className="bg-leaf-800 text-center text-xs font-medium text-leaf-100">
        <p className="container-x py-1.5">
          Free delivery on orders above Rs. 3,000 in Karachi 🚚 · Same-day slots available
        </p>
      </div>

      <div className="container-x flex h-16 items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-600 text-lg">🥬</span>
          <span className="font-display text-xl font-800 font-extrabold tracking-tight">
            Fresh<span className="text-leaf-600">Bazaar</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <NavLink to="/" className={linkCls} end>Home</NavLink>
          <NavLink to="/shop" className={linkCls}>Shop</NavLink>
        </nav>

        <form onSubmit={submit} className="ml-auto hidden max-w-md flex-1 md:block">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input rounded-full pl-10"
              placeholder="Search atta, doodh, chai…"
              aria-label="Search products"
            />
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-leaf-950/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </form>

        <button
          className="ml-auto rounded-full p-2 hover:bg-leaf-100 md:ml-0 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle search"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>

        <Link to="/cart" className="relative rounded-full p-2 hover:bg-leaf-100" aria-label={`Cart, ${count} items`}>
          <CartIcon className="h-6 w-6 text-leaf-900" />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={bounceKey}
                initial={{ scale: 0.4 }}
                animate={{ scale: [0.4, 1.35, 1] }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime2 px-1 text-[11px] font-bold text-leaf-950"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={submit}
            className="overflow-hidden border-t border-leaf-100 md:hidden"
          >
            <div className="container-x py-3">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="input rounded-full"
                placeholder="Search atta, doodh, chai…"
              />
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </header>
  );
}
