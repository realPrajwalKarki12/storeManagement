import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import NewOrderModal from './NewOrderModal'

const ordersData = [
  {
    id: 'ORD-2026-0148', invoice: 'INV-2026-0148', customer: 'Sandra Vega', date: '2026-07-29',
    total: 950.00, status: 'Completed',
    items: [
      { name: 'ABC Powder 1kg', qty: 20, price: 38.50, subtotal: 770.00 },
      { name: 'Fire Blanket 1m x 1m', qty: 10, price: 18.00, subtotal: 180.00 },
    ],
  },
  { id: 'ORD-2026-0147', invoice: 'INV-2026-0147', customer: 'Priya Nair', date: '2026-07-28', total: 1050.00, status: 'Pending', items: [] },
  { id: 'ORD-2026-0146', invoice: 'INV-2026-0146', customer: 'Tom Hargreaves', date: '2026-07-26', total: 975.00, status: 'Completed', items: [] },
  { id: 'ORD-2026-0145', invoice: 'INV-2026-0145', customer: 'Marcus Webb', date: '2026-07-24', total: 600.00, status: 'Completed', items: [] },
  { id: 'ORD-2026-0144', invoice: 'INV-2026-0144', customer: 'James Kowalski', date: '2026-07-22', total: 725.00, status: 'Cancelled', items: [] },
  { id: 'ORD-2026-0143', invoice: 'INV-2026-0143', customer: 'Dmitri Orlov', date: '2026-07-20', total: 660.00, status: 'Completed', items: [] },
  { id: 'ORD-2026-0142', invoice: 'INV-2026-0142', customer: 'Aisha Monroe', date: '2026-07-18', total: 298.00, status: 'Completed', items: [] },
  { id: 'ORD-2026-0141', invoice: 'INV-2026-0141', customer: 'Priya Nair', date: '2026-07-15', total: 1278.00, status: 'Completed', items: [] },
]

const statusOptions = ['Completed', 'Pending', 'Cancelled']

const statusStyles = {
  Completed: 'bg-green-50 text-green-600 border-green-200',
  Pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  Cancelled: 'bg-red-50 text-red-500 border-red-200',
}

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${statusStyles[status]}`}>
    {status}
  </span>
)

const Orders = () => {
  const [orders, setOrders] = useState(ordersData)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)

  const counts = {
    All: orders.length,
    Completed: orders.filter(o => o.status === 'Completed').length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Cancelled: orders.filter(o => o.status === 'Cancelled').length,
  }

  const filtered = orders.filter((o) => {
    const matchesFilter = activeFilter === 'All' || o.status === activeFilter
    const q = search.toLowerCase()
    const matchesSearch =
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.invoice.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const handleCreateOrder = (newOrder) => {
    const nextNum = Math.max(...orders.map(o => parseInt(o.id.split('-')[2]))) + 1
    const paddedNum = String(nextNum).padStart(4, '0')
    const order = {
      id: `ORD-2026-${paddedNum}`,
      invoice: `INV-2026-${paddedNum}`,
      customer: newOrder.customer,
      date: new Date().toISOString().split('T')[0],
      total: newOrder.total,
      status: newOrder.status,
      items: newOrder.items,
    }
    setOrders([order, ...orders])
    setShowNewOrder(false)
  }

  return (
    <div className='flex gap-4'>
      {/* Main content */}
      <div className={selectedOrder ? 'flex-1 min-w-0' : 'w-full'}>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <span className='uppercase text-3xl font-bold leading-10'>Purchase Log</span>
            <h2 className='text-xs text-color tracking-widest mt-1'>
              {counts.All} TOTAL · {counts.Pending} PENDING
            </h2>
          </div>
          <button
            onClick={() => setShowNewOrder(true)}
            className='bg-[#C0392B] hover:bg-[#a8321f] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap'
          >
            + New Order
          </button>
        </div>

        {/* Search + filter tabs */}
        <div className='mt-6 flex flex-col sm:flex-row gap-3'>
          <div className='relative flex-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-color' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Order ID, customer, invoice...'
              className='w-full pl-9 pr-3 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {['All', 'Completed', 'Pending', 'Cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase whitespace-nowrap transition-colors border ${
                  activeFilter === f
                    ? 'border-[#C0392B] text-[#C0392B] bg-red-50'
                    : 'border-transparent text-color bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className='mt-4 border stroke-color bg-white rounded-xl overflow-x-auto'>
          <table className='w-full text-sm min-w-[700px]'>
            <thead>
              <tr className='text-left text-xs text-color border-b stroke-color'>
                <th className='px-4 py-3 font-medium'>Order ID</th>
                <th className='px-4 py-3 font-medium'>Customer</th>
                <th className='px-4 py-3 font-medium'>Date</th>
                <th className='px-4 py-3 font-medium'>Total</th>
                <th className='px-4 py-3 font-medium'>Status</th>
                <th className='px-4 py-3 font-medium'>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`border-b stroke-color last:border-0 cursor-pointer hover:bg-gray-50 ${
                    selectedOrder?.id === o.id ? 'bg-red-50/40' : ''
                  }`}
                >
                  <td className='px-4 py-3 text-[#C0392B] font-medium'>{o.id}</td>
                  <td className='px-4 py-3 font-semibold'>{o.customer}</td>
                  <td className='px-4 py-3 text-color'>{o.date}</td>
                  <td className='px-4 py-3 font-medium'>${o.total.toFixed(2)}</td>
                  <td className='px-4 py-3'><StatusBadge status={o.status} /></td>
                  <td className='px-4 py-3' onClick={(e) => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className='text-sm border stroke-color rounded-lg px-2 py-1.5 outline-none focus:border-[#C0392B] bg-white'
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className='px-4 py-10 text-center text-color text-sm'>No orders match your search.</div>
          )}
        </div>
      </div>

      {/* Order detail side panel */}
      {selectedOrder && (
        <div className='w-full max-w-[320px] border stroke-color bg-white rounded-xl p-5 h-fit sticky top-4'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='text-[#C0392B] text-xl font-bold'>{selectedOrder.id}</h1>
              <p className='text-xs text-color mt-1'>{selectedOrder.invoice}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className='text-color hover:text-black'
            >
              <X size={18} />
            </button>
          </div>

          <div className='h-px bg-[#C0392B]/30 my-4' />

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-color'>Customer</span>
              <span className='font-medium'>{selectedOrder.customer}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-color'>Date</span>
              <span className='font-medium'>{selectedOrder.date}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-color'>Status</span>
              <StatusBadge status={selectedOrder.status} />
            </div>
          </div>

          <h2 className='text-xs uppercase tracking-wide text-color mt-6 mb-3'>Line Items</h2>
          {selectedOrder.items.length > 0 ? (
            <div className='space-y-3'>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className='flex justify-between text-sm'>
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-xs text-color'>{item.qty} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className='font-medium'>${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-xs text-color'>No line item details available.</p>
          )}

          <div className='h-px bg-gray-200 my-4' />

          <div className='flex justify-between items-center'>
            <span className='text-xs uppercase tracking-wide text-color'>Total</span>
            <span className='text-[#C0392B] font-bold text-xl'>${selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* New Order modal */}
      {showNewOrder && (
        <NewOrderModal
          onClose={() => setShowNewOrder(false)}
          onSave={handleCreateOrder}
        />
      )}
    </div>
  )
}

export default Orders