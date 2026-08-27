import { useState } from "react";

const CATEGORIES = ["Dry Powder", "CO2", "Foam", "Water", "Wet Chemical", "Accessories"];

const emptyForm = {
  sku: "", name: "", category: "Dry Powder", agent: "", capacity: "",
  price: "", stock: "", min: "", restocked: new Date().toISOString().slice(0, 10),
};

export function AddProductModal({ open, onClose, onSave, existingSkus = [] }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function handleSave() {
    const sku = form.sku.trim();
    const name = form.name.trim();
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);
    const min = parseInt(form.min, 10);

    const nextErrors = {};
    if (!sku) nextErrors.sku = "SKU is required";
    else if (existingSkus.some((s) => s.toLowerCase() === sku.toLowerCase()))
      nextErrors.sku = "SKU already exists";
    if (!name) nextErrors.name = "Product name is required";
    if (!Number.isFinite(price) || price < 0) nextErrors.price = "Enter a valid price";
    if (!Number.isFinite(stock) || stock < 0) nextErrors.stock = "Enter a valid stock quantity";
    if (!Number.isFinite(min) || min < 0) nextErrors.min = "Enter a valid minimum level";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({
      sku, name, category: form.category,
      agent: form.agent.trim() || "—",
      capacity: form.capacity.trim() || "—",
      price, stock, min, restocked: form.restocked,
    });

    setForm(emptyForm);
    setErrors({});
  }

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center p-5 z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <h2 className="font-extrabold text-lg">Add Product</h2>
          <button onClick={handleClose} className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500">✕</button>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="SKU *" error={errors.sku}>
            <input value={form.sku} onChange={(e) => field("sku", e.target.value)} placeholder="EXT-ABC-4KG" className="input" />
          </Field>
          <Field label="Product Name *" error={errors.name}>
            <input value={form.name} onChange={(e) => field("name", e.target.value)} placeholder="ABC Powder Extinguisher 4kg" className="input" />
          </Field>
          <Field label="Category *">
            <select value={form.category} onChange={(e) => field("category", e.target.value)} className="input">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Agent">
            <input value={form.agent} onChange={(e) => field("agent", e.target.value)} placeholder="ABC Powder" className="input" />
          </Field>
          <Field label="Capacity">
            <input value={form.capacity} onChange={(e) => field("capacity", e.target.value)} placeholder="4 kg / 6 L / —" className="input" />
          </Field>
          <Field label="Unit Price ($) *" error={errors.price}>
            <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => field("price", e.target.value)} placeholder="65.00" className="input" />
          </Field>
          <Field label="Stock Qty *" error={errors.stock}>
            <input type="number" min="0" value={form.stock} onChange={(e) => field("stock", e.target.value)} placeholder="30" className="input" />
          </Field>
          <Field label="Min Stock Level *" error={errors.min}>
            <input type="number" min="0" value={form.min} onChange={(e) => field("min", e.target.value)} placeholder="15" className="input" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Restocked Date">
              <input type="date" value={form.restocked} onChange={(e) => field("restocked", e.target.value)} className="input" />
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-neutral-200">
          <button onClick={handleClose} className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm px-4 py-2.5 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-md shadow-red-600/25">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11.5px] font-bold text-neutral-600 tracking-wide">{label}</label>
      {children}
      {error && <div className="text-[11px] font-semibold text-red-700">{error}</div>}
    </div>
  );
}