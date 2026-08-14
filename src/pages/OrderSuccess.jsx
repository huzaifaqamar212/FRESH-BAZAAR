import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { priceFmt } from "../data/products.js";

export default function OrderSuccess() {
  const { state } = useLocation();
  if (!state?.orderId) return <Navigate to="/" replace />;

  return (
    <div className="container-x grid place-items-center py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg rounded-3xl border border-leaf-100 bg-white p-8 text-center shadow-card"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf-100 text-4xl"
        >
          ✅
        </motion.div>
        <h1 className="mt-5 font-display text-3xl font-extrabold">Order placed, {state.name?.split(" ")[0] || "dost"}!</h1>
        <p className="mt-2 text-leaf-950/70">
          Your groceries are being packed at the store. The rider will call before arriving.
        </p>

        <dl className="mt-6 space-y-2 rounded-2xl bg-leaf-50 p-5 text-left text-sm">
          <div className="flex justify-between"><dt className="text-leaf-950/60">Order ID</dt><dd className="font-mono font-bold">{state.orderId}</dd></div>
          <div className="flex justify-between"><dt className="text-leaf-950/60">Items</dt><dd className="font-semibold">{state.count}</dd></div>
          <div className="flex justify-between"><dt className="text-leaf-950/60">Delivery slot</dt><dd className="font-semibold">{state.slot}</dd></div>
          <div className="flex justify-between"><dt className="text-leaf-950/60">Amount to pay</dt><dd className="font-display font-extrabold">{priceFmt(state.total)}</dd></div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/shop" className="btn-primary">Shop again</Link>
          <Link to="/" className="btn-ghost">Back to home</Link>
        </div>
      </motion.div>
    </div>
  );
}
