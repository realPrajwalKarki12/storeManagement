import React, { useState } from 'react'
import { X } from 'lucide-react'

const customersList = [
  'Sandra Vega', 'Priya Nair', 'Tom Hargreaves', 'Marcus Webb',
  'James Kowalski', 'Dmitri Orlov', 'Aisha Monroe',
]

const productsList = [
  { name: 'ABC Powder Extinguisher 1kg', price: 38.50 },
  { name: 'ABC Powder Extinguisher 2kg', price: 52.00 },
  { name: 'ABC Powder Extinguisher 6kg', price: 89.00 },
  { name: 'CO2 Extinguisher 2kg', price: 95.00 },
  { name: 'CO2 Extinguisher 5kg', price: 145.00 },
  { name: 'Foam Extinguisher 6L', price: 75.00 },
  { name: 'Foam Extinguisher 9L', price: 98.00 },
  { name: 'Water Extinguisher 9L', price: 65.00 },
  { name: 'Wet Chemical Extinguisher 6L', price: 120.00 },
  { name: 'Fire Blanket 1m x 1m', price: 18.00 },
]

const statusOptions = ['Pending', 'Completed', 'Cancelled']

let lineItemId = 0
const newLineItem = () => ({ id: lineItemId++, product: '', qty: 1 })

const NewOrderModal = ({ onClose, onSave }) => {
  const [customer, setCustomer] = useState('')
  const [status, setStatus] = useState('Pending')
  const [lineItems, setLineItems] = useState([newLineItem()])
  const [error, setError] = useState('')

  const getPrice = (productName) =>
    productsList.find((p) => p.name === productName)?.price || 0

  const total = lineItems.reduce(
    (sum, item) => sum + getPrice(item.product) * (Number(item.qty) || 0),
    0
  )

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const addLineItem = () => {
    setLineItems([...lineItems, newLineItem()])
  }

  const handleSave = () => {
    if (!customer) {
      setError('Please select a customer.')
      return
    }
    const validItems = lineItems.filter((i) => i.product && i.qty > 0)
    if (validItems.length === 0) {
      setError('Please add at least one line item.')
      return
    }
    setError('')
    onSave({
      customer,
      status,
      items: validItems.map((i) => ({
        name: i.product,
        qty: Number(i.qty),
        price: getPrice(i.product),
        subtotal: getPrice(i.product) * Number(i.qty),
      })),
      total,
    })
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='uppercase text-xl font-bold'>New Order</h1>
          <button onClick={onClose} className='text-color hover:text-black'>
            <X size={20} />
          </button>
        </div>

        {/* Customer */}
        <label className='block text-xs uppercase tracking-wide text-color mb-2'>Customer</label>
        <select
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] mb-5 bg-white'
        >
          <option value=''>Select customer...</option>
          {customersList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Status */}
        <label className='block text-xs uppercase tracking-wide text-color mb-2'>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] mb-5 bg-white'
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Line items */}
        <label className='block text-xs uppercase tracking-wide text-color mb-2'>Line Items</label>
        <div className='space-y-3'>
          {lineItems.map((item) => (
            <div key={item.id} className='flex gap-2'>
              <select
                value={item.product}
                onChange={(e) => updateLineItem(item.id, 'product', e.target.value)}
                className='flex-1 px-3 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] bg-white min-w-0'
              >
                <option value=''>Select product...</option>
                {productsList.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
              <input
                type='number'
                min='1'
                value={item.qty}
                onChange={(e) => updateLineItem(item.id, 'qty', e.target.value)}
                className='w-16 px-2 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] text-center'
              />
              <button
                onClick={() => removeLineItem(item.id)}
                disabled={lineItems.length === 1}
                className='w-10 flex items-center justify-center border border-red-200 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed shrink-0'
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLineItem}
          className='w-full mt-3 py-2.5 text-sm font-medium text-color border stroke-color border-dashed rounded-lg hover:bg-gray-50'
        >
          + Add Item
        </button>

        {/* Total */}
        <div className='text-right mt-5'>
          <span className='text-[#C0392B] font-bold text-xl'>
            Total: ${total.toFixed(2)}
          </span>
        </div>

        {error && <p className='text-xs text-red-600 mt-3'>{error}</p>}

        {/* Actions */}
        <div className='flex gap-3 mt-6'>
          <button
            onClick={handleSave}
            className='flex-1 bg-[#C0392B] hover:bg-[#a8321f] text-white font-bold uppercase tracking-wide text-sm py-3 rounded-lg transition-colors'
          >
            Save
          </button>
          <button
            onClick={onClose}
            className='flex-1 border stroke-color text-color font-medium text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewOrderModal