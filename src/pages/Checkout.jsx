import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { priceFmt } from "../data/products.js";

const AREAS = ["Gulshan-e-Iqbal", "DHA", "Clifton", "PECHS", "North Nazimabad", "Bahadurabad", "Malir", "Korangi"];
const SLOTS = ["Today, 6–8 pm", "Today, 8–10 pm", "Tomorrow, 10 am–12 pm", "Tomorrow, 4–6 pm"];

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clear, count } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", area: AREAS[0], address: "", slot: SLOTS[0], payment: "cod", notes: "",
  });
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div className="container-x grid place-items-center py-32 text-center">
        <div>
          <p className="text-5xl">🧾</p>
          <h1 className="mt-4 font-display text-2xl font-extrabold">Nothing to check out</h1>
          <Link to="/shop" className="btn-primary mt-6">Go shopping</Link>
        </div>
      </div>
    );
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 3) errs.name = "Enter your full name";
    if (!/^03\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      errs.phone = "Enter a valid mobile number, e.g. 0300 1234567";
    if (form.address.trim().length < 10) errs.address = "Enter house no., street, and block";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const orderId = "FB-" + Math.floor(100000 + Math.random() * 900000);
    clear();
    nav("/order-success", { state: { orderId, total, count, slot: form.slot, name: form.name } });
  };

  const field = (label, key, props = {}, error) => (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input className={`input mt-1.5 ${error ? "border-red-400 focus:ring-red-100" : ""}`} value={form[key]} onChange={set(key)} {...props} />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-3xl font-extrabold">Checkout</h1>

      <form onSubmit={submit} className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">1 · Delivery details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field("Full name", "name", { placeholder: "Ayesha Khan" }, errors.name)}
              {field("Mobile number", "phone", { placeholder: "0300 1234567", inputMode: "tel" }, errors.phone)}
              <label className="block">
                <span className="text-sm font-semibold">Area</span>
                <select className="input mt-1.5" value={form.area} onChange={set("area")}>
                  {AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Delivery slot</span>
                <select className="input mt-1.5" value={form.slot} onChange={set("slot")}>
                  {SLOTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <div className="sm:col-span-2">
                {field("Street address", "address", { placeholder: "House 12-B, Street 4, Block 6" }, errors.address)}
              </div>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Rider notes <span className="font-normal text-leaf-950/50">(optional)</span></span>
                <textarea className="input mt-1.5 min-h-20 resize-y" value={form.notes} onChange={set("notes")} placeholder="Ring the bell twice, gate is blue…" />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">2 · Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { id: "cod", label: "Cash on delivery", icon: "💵" },
                { id: "card", label: "Card on delivery", icon: "💳" },
                { id: "wallet", label: "JazzCash / Easypaisa", icon: "📱" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.payment === m.id ? "border-leaf-500 bg-leaf-50 ring-2 ring-leaf-200" : "border-leaf-200 hover:border-leaf-300"
                  }`}
                >
                  <input type="radio" name="payment" value={m.id} checked={form.payment === m.id} onChange={set("payment")} className="accent-leaf-600" />
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm font-semibold">{m.label}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-leaf-950/50">Demo checkout — no payment is processed.</p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-leaf-100 bg-leaf-50/60 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold">Your order ({count})</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-auto pr-1 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <img src={i.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                <span className="flex-1 leading-tight">{i.name} <span className="text-leaf-950/50">× {i.qty}</span></span>
                <span className="font-semibold">{priceFmt(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-leaf-200 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-leaf-950/60">Subtotal</dt><dd className="font-semibold">{priceFmt(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-leaf-950/60">Delivery</dt><dd className="font-semibold">{deliveryFee === 0 ? "Free" : priceFmt(deliveryFee)}</dd></div>
            <div className="flex justify-between text-base"><dt className="font-display font-bold">Total</dt><dd className="font-display font-extrabold">{priceFmt(total)}</dd></div>
          </dl>
          <button type="submit" className="btn-primary mt-5 w-full">Place order — {priceFmt(total)}</button>
        </aside>
      </form>
    </div>
  );
}
