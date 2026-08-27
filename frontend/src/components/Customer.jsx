import React, { useState } from 'react'
import { Search } from 'lucide-react'
import NewCustomerModal from './CustomerModal'

const initialCustomers = [
  { id: 'C006', name: 'Sandra Vega', company: 'Vega Hospitality Group', city: 'Miami, FL', joined: '2023-09-14', orders: 29, spent: 21400.00 },
  { id: 'C002', name: 'Priya Nair', company: 'SafeHaven Facilities', city: 'Dallas, TX', joined: '2024-01-05', orders: 18, spent: 12350.50 },
  { id: 'C005', name: 'Tom Hargreaves', company: 'Hargreaves Construction', city: 'Phoenix, AZ', joined: '2024-02-18', orders: 11, spent: 7600.00 },
  { id: 'C001', name: 'Marcus Webb', company: 'Webb Builders LLC', city: 'Houston, TX', joined: '2024-03-12', orders: 7, spent: 4820.00 },
  { id: 'C003', name: 'James Kowalski', company: 'Kowalski Ironworks', city: 'Chicago, IL', joined: '2023-11-22', orders: 5, spent: 3200.00 },
  { id: 'C007', name: 'Dmitri Orlov', company: 'Orlov Logistics', city: 'Seattle, WA', joined: '2024-04-30', orders: 3, spent: 1950.00 },
  { id: 'C004', name: 'Aisha Monroe', company: 'Monroe Facilities Group', city: 'Atlanta, GA', joined: '2024-06-01', orders: 2, spent: 870.00 },
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'city', label: 'City' },
  { key: 'joined', label: 'Joined' },
  { key: 'orders', label: 'Orders' },
  { key: 'spent', label: 'Total Spent' },
]

const Customers = () => {
  const [customersData, setCustomersData] = useState(initialCustomers)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('spent')
  const [sortDir, setSortDir] = useState('desc')
  const [showNewCustomer, setShowNewCustomer] = useState(false)

  const currentYear = new Date().getFullYear().toString()
  const joinedThisYear = customersData.filter(c => c.joined.startsWith(currentYear)).length

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const handleCreateCustomer = (newCustomer) => {
    const nextNum = Math.max(...customersData.map(c => parseInt(c.id.slice(1)))) + 1
    const customer = {
      id: `C${String(nextNum).padStart(3, '0')}`,
      name: newCustomer.name,
      company: newCustomer.company,
      city: newCustomer.city,
      joined: new Date().toISOString().split('T')[0],
      orders: 0,
      spent: 0,
    }
    setCustomersData([customer, ...customersData])
    setShowNewCustomer(false)
  }

  const filtered = customersData.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    }
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <span className='uppercase text-3xl font-bold leading-10'>Customers</span>
          <h2 className='text-xs text-color tracking-widest mt-1'>
            {customersData.length} RECORDS · {joinedThisYear} JOINED THIS YEAR
          </h2>
        </div>
        <button
          onClick={() => setShowNewCustomer(true)}
          className='bg-[#C0392B] hover:bg-[#a8321f] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors'
        >
          + New Customer
        </button>
      </div>

      {/* Search */}
      <div className='relative mt-6 max-w-md'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-color' />
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search name, email, company, city...'
          className='w-full pl-9 pr-3 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
        />
      </div>

      {/* Table */}
      <div className='mt-4 border stroke-color bg-white rounded-xl overflow-x-auto'>
        <table className='w-full text-sm min-w-[800px]'>
          <thead>
            <tr className='text-left text-xs text-color border-b stroke-color'>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className='px-4 py-3 font-medium cursor-pointer select-none hover:text-[#C0392B]'
                >
                  {col.label}{' '}
                  <span className='text-[10px]'>
                    {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '▲▼'}
                  </span>
                </th>
              ))}
              <th className='px-4 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className='border-b stroke-color last:border-0'>
                <td className='px-4 py-3 text-color text-xs'>{c.id}</td>
                <td className='px-4 py-3 font-semibold'>{c.name}</td>
                <td className='px-4 py-3 text-color'>{c.company}</td>
                <td className='px-4 py-3 text-color'>{c.city}</td>
                <td className='px-4 py-3 text-color'>{c.joined}</td>
                <td className='px-4 py-3'>{c.orders}</td>
                <td className='px-4 py-3 text-[#C0392B] font-semibold'>
                  ${c.spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className='px-4 py-3'>
                  <div className='flex gap-2'>
                    <button className='px-3 py-1.5 text-xs font-medium border stroke-color rounded-md hover:bg-gray-50'>
                      Edit
                    </button>
                    <button className='px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-md hover:bg-red-100'>
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className='px-4 py-10 text-center text-color text-sm'>No customers match your search.</div>
        )}
      </div>

      {/* New Customer modal */}
      {showNewCustomer && (
        <NewCustomerModal
          onClose={() => setShowNewCustomer(false)}
          onSave={handleCreateCustomer}
        />
      )}
    </div>
  )
}

export default Customers