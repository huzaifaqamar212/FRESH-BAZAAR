import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-leaf-100 bg-leaf-950 text-leaf-100">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-600 text-lg">🥬</span>
            <span className="font-display text-xl font-extrabold text-white">
              Fresh<span className="text-lime2">Bazaar</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-leaf-200/80">
            Karachi's neighbourhood grocery, online. Mandi-fresh produce, trusted brands,
            and delivery slots that respect your time.
          </p>
        </div>

        <div>
          <h3 className="font-display font-bold text-white">Shop by category</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link className="text-leaf-200/80 hover:text-lime2" to={`/shop?category=${c.id}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-white">Help</h3>
          <ul className="mt-4 space-y-2 text-sm text-leaf-200/80">
            <li>Delivery areas &amp; slots</li>
            <li>Returns &amp; refunds</li>
            <li>Track your order</li>
            <li>WhatsApp support</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-leaf-200/80">
            <li>📞 021-111-374-374</li>
            <li>✉️ care@freshbazaar.pk</li>
            <li>📍 Shahrah-e-Faisal, Karachi</li>
            <li>🕘 9 am – 11 pm, all week</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-4 text-center text-xs text-leaf-200/60">
          © {new Date().getFullYear()} FreshBazaar (Pvt) Ltd. Prices include GST where applicable.
        </p>
      </div>
    </footer>
  );
}
