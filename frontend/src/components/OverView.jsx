import React from 'react'
import { NavLink } from 'react-router-dom';
import { MoveRight } from 'lucide-react'

const Card = ({ title, value, extra }) => {
  return (
    <div className='p-5 border stroke-color bg-white rounded-xl'>
      <span className='text-color text-xs uppercase tracking-wide'>{title}</span>
      <h1 className='font-bold text-2xl mt-1'>{value}</h1>
      <h2 className='text-xs text-color mt-1'>{extra}</h2>
    </div>
  )
}

const statusStyles = {
  COMPLETED: 'bg-green-50 text-green-600',
  PENDING: 'bg-yellow-50 text-yellow-600',
  CANCELLED: 'bg-red-50 text-red-500',
}

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase ${statusStyles[status] || 'bg-gray-100 text-gray-500'}`}>
    {status}
  </span>
)

const orders = [
  { id: 'ORD-2026-0148', customer: 'Sandra Vega', date: '2026-07-29', total: '$950.00', status: 'COMPLETED' },
  { id: 'ORD-2026-0147', customer: 'Priya Nair', date: '2026-07-28', total: '$1,050.00', status: 'PENDING' },
  { id: 'ORD-2026-0146', customer: 'Tom Hargreaves', date: '2026-07-26', total: '$975.00', status: 'COMPLETED' },
  { id: 'ORD-2026-0145', customer: 'Marcus Webb', date: '2026-07-24', total: '$600.00', status: 'COMPLETED' },
  { id: 'ORD-2026-0144', customer: 'James Kowalski', date: '2026-07-22', total: '$725.00', status: 'CANCELLED' },
  { id: 'ORD-2026-0143', customer: 'Dmitri Orlov', date: '2026-07-20', total: '$660.00', status: 'COMPLETED' },
]

const stock = [
  { name: 'ABC Powder Extinguisher 1kg', qty: 142, low: false },
  { name: 'ABC Powder Extinguisher 2kg', qty: 87, low: false },
  { name: 'ABC Powder Extinguisher 6kg', qty: 54, low: false },
  { name: 'CO2 Extinguisher 2kg', qty: 18, low: true },
  { name: 'CO2 Extinguisher 5kg', qty: 7, low: true },
  { name: 'Foam Extinguisher 6L', qty: 63, low: false },
  { name: 'Foam Extinguisher 9L', qty: 29, low: false },
  { name: 'Water Extinguisher 9L', qty: 41, low: false },
  { name: 'Wet Chemical Extinguisher 6L', qty: 22, low: false },
  { name: 'Fire Blanket 1m x 1m', qty: 95, low: false },
]

const topCustomers = [
  { rank: 1, name: 'Sandra Vega', company: 'Vega Hospitality Group', spend: '$21,400', orders: 29 },
  { rank: 2, name: 'Priya Nair', company: 'SafeHaven Facilities', spend: '$12,351', orders: 18 },
  { rank: 3, name: 'Tom Hargreaves', company: 'Hargreaves Construction', spend: '$7,600', orders: 11 },
  { rank: 4, name: 'Marcus Webb', company: 'Webb Builders LLC', spend: '$4,820', orders: 7 },
  { rank: 5, name: 'James Kowalski', company: 'Kowalski Ironworks', spend: '$3,200', orders: 5 },
]

const maxQty = Math.max(...stock.map(s => s.qty))

const OverView = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).toUpperCase();

  return (
    <div>
    
      <span className='uppercase text-3xl font-bold leading-10'>Operations</span>{' '}
      <span className='uppercase text-3xl text-[#D1D5DB]'>Overview</span>
      <h2 className='text-xs text-color tracking-widest mt-1'>{formattedDate}</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card title="Revenue (Completed)" value="$4,761" extra="6 orders" />
        <Card title="Total Customers" value="7" extra="0 joined 2026" />
        <Card title="Pending Orders" value="1" extra="$1,050 in queue" />
        <Card title="Low / Out of Stock" value="3" extra="of 12 products" />
      </div>

      {/* Orders + Stock */}
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-4'>
        {/* Recent Orders */}
        <div className='lg:col-span-2 border stroke-color bg-white rounded-xl p-5'>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm font-semibold uppercase tracking-wide">Recent Orders</h1>
            <NavLink to="/orders" className="text-xs font-semibold text-[#C0392B] flex items-center gap-1">
              View all <MoveRight size={14} />
            </NavLink>
          </div>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left text-[10px] uppercase text-color'>
                <th className='pb-2 font-medium'>Order ID</th>
                <th className='pb-2 font-medium'>Customer</th>
                <th className='pb-2 font-medium'>Date</th>
                <th className='pb-2 font-medium'>Total</th>
                <th className='pb-2 font-medium'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className='border-t stroke-color'>
                  <td className='py-3 text-[#C0392B] font-medium'>{o.id}</td>
                  <td className='py-3'>{o.customer}</td>
                  <td className='py-3 text-color'>{o.date}</td>
                  <td className='py-3 font-medium'>{o.total}</td>
                  <td className='py-3'><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stock Levels */}
        <div className='border stroke-color bg-white rounded-xl p-5'>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm font-semibold uppercase tracking-wide">Stock Levels</h1>
            <NavLink to="/inventory" className="text-xs font-semibold text-[#C0392B]">All →</NavLink>
          </div>
          <div className='space-y-4'>
            {stock.map((s) => (
              <div key={s.name}>
                <div className='flex items-center justify-between text-sm mb-1'>
                  <span className={s.low ? 'text-[#C0392B] font-medium' : ''}>{s.name}</span>
                  <span className='text-color'>{s.qty}</span>
                </div>
                <div className='h-1 w-full bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className={`h-full rounded-full ${s.low ? 'bg-[#C0392B]' : 'bg-green-500'}`}
                    style={{ width: `${(s.qty / maxQty) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers by Spend */}
      <div className='border stroke-color bg-white rounded-xl p-5 mt-4'>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-sm font-semibold uppercase tracking-wide">Top Customers by Spend</h1>
          <NavLink to="/customers" className="text-xs font-semibold text-[#C0392B]">View all →</NavLink>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
          {topCustomers.map((c) => (
            <div key={c.rank} className='pt-3 border-t-2 stroke-color'>
              <span className='text-color text-xs'>#{c.rank}</span>
              <h2 className='font-semibold mt-1'>{c.name}</h2>
              <p className='text-xs text-color'>{c.company}</p>
              <p className='text-[#C0392B] font-bold text-xl mt-2'>{c.spend}</p>
              <p className='text-xs text-color'>{c.orders} orders</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OverView