import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.tags.includes("featured"));
  const deals = PRODUCTS.filter((p) => p.tags.includes("deal")).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-leaf-50 to-white">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-lime2/30 px-4 py-1.5 text-sm font-semibold text-leaf-800">
              🚚 Same-day delivery across Karachi
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Mandi-fresh groceries,{" "}
              <span className="text-leaf-600">delivered to your door.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-leaf-950/70">
              From Sindhri mangoes to Tapal chai — everything your kitchen runs on, at
              prices that beat the Sunday bazaar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">Start shopping</Link>
              <Link to="/shop?deals=1" className="btn-ghost">Today's deals</Link>
            </div>
            <div className="mt-8 flex gap-8 text-sm">
              <div><p className="font-display text-2xl font-bold">30+</p><p className="text-leaf-950/60">daily essentials</p></div>
              <div><p className="font-display text-2xl font-bold">60 min</p><p className="text-leaf-950/60">express slots</p></div>
              <div><p className="font-display text-2xl font-bold">4.7★</p><p className="text-leaf-950/60">customer rating</p></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=700&fit=crop"
              alt="Fresh produce aisle"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
            <div className="absolute -bottom-4 left-4 rounded-2xl bg-white px-5 py-3 shadow-card sm:left-8">
              <p className="text-xs text-leaf-950/60">Order before 6 pm</p>
              <p className="font-display font-bold text-leaf-700">Delivered tonight 🌙</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Shop by category</h2>
          <Link to="/shop" className="text-sm font-semibold text-leaf-600 hover:text-leaf-800">View all →</Link>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {CATEGORIES.map((c) => (
            <motion.div key={c.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
              <Link
                to={`/shop?category=${c.id}`}
                className="group flex items-center gap-3 rounded-2xl border border-leaf-100 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-leaf-300"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-leaf-50 text-2xl transition group-hover:bg-lime2/40">
                  {c.emoji}
                </span>
                <span className="text-sm font-semibold leading-tight">{c.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Deals banner */}
      <section className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-leaf-800 px-6 py-10 text-white sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lime2/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-14 right-24 h-40 w-40 rounded-full bg-leaf-500/30 blur-2xl" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-lime2">Weekend bachat</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Up to 20% off pantry staples</h2>
              <p className="mt-2 max-w-xl text-white/80">
                Basmati rice, Tapal Danedar, Surf Excel and more — restock the ghar ka saman before Sunday.
              </p>
            </div>
            <Link to="/shop?deals=1" className="btn-primary bg-lime2 text-leaf-950 hover:bg-lime2/90">
              Grab the deals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-12">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Karachi favourites</h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      </section>

      {/* Deals grid */}
      <section className="container-x pb-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Today's deals 🔥</h2>
          <Link to="/shop?deals=1" className="text-sm font-semibold text-leaf-600 hover:text-leaf-800">See all →</Link>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      </section>
    </div>
  );
}
