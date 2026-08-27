import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react'
import { AddProductModal } from './AddProduct';
const Card = ({ title, value, accent }) => {
  return (
    <div className={`p-5 border rounded-xl bg-white ${accent ? 'border-l-4' : 'stroke-color'}`}
      style={accent ? { borderLeftColor: accent } : {}}>
      <span className='text-color text-xs uppercase tracking-wide'>{title}</span>
      <h1 className='font-bold text-2xl mt-1'>{value}</h1>
    </div>
  )
}

const categories = ['All', 'Dry Powder', 'CO2', 'Foam', 'Water', 'Wet Chemical', 'Accessories']

const inventory = [
  { sku: 'EXT-CO2-5KG', product: 'CO2 Extinguisher 5kg', category: 'CO2', agent: 'Carbon Dioxide', capacity: '5 kg', stock: 7, min: 15, price: '$145.00', restocked: '2026-05-10', status: 'LOW' },
  { sku: 'EXT-VEH-1KG', product: 'Vehicle Fire Extinguisher 1kg', category: 'Dry Powder', agent: 'ABC Powder', capacity: '1 kg', stock: 12, min: 20, price: '$44.00', restocked: '2026-04-18', status: 'LOW' },
  { sku: 'EXT-CO2-2KG', product: 'CO2 Extinguisher 2kg', category: 'CO2', agent: 'Carbon Dioxide', capacity: '2 kg', stock: 18, min: 20, price: '$95.00', restocked: '2026-05-10', status: 'LOW' },
  { sku: 'EXT-WC-6L', product: 'Wet Chemical Extinguisher 6L', category: 'Wet Chemical', agent: 'Wet Chemical', capacity: '6 L', stock: 22, min: 10, price: '$120.00', restocked: '2026-06-05', status: 'OK' },
  { sku: 'EXT-FOAM-9L', product: 'Foam Extinguisher 9L', category: 'Foam', agent: 'AFFF Foam', capacity: '9 L', stock: 29, min: 15, price: '$98.00', restocked: '2026-07-01', status: 'OK' },
  { sku: 'EXT-WAT-9L', product: 'Water Extinguisher 9L', category: 'Water', agent: 'Water', capacity: '9 L', stock: 41, min: 15, price: '$65.00', restocked: '2026-06-20', status: 'OK' },
  { sku: 'EXT-ABC-6KG', product: 'ABC Powder Extinguisher 6kg', category: 'Dry Powder', agent: 'ABC Powder', capacity: '6 kg', stock: 54, min: 20, price: '$89.00', restocked: '2026-06-28', status: 'OK' },
  { sku: 'EXT-FOAM-6L', product: 'Foam Extinguisher 6L', category: 'Foam', agent: 'AFFF Foam', capacity: '6 L', stock: 63, min: 20, price: '$75.00', restocked: '2026-07-01', status: 'OK' },
  { sku: 'EXT-ABC-2KG', product: 'ABC Powder Extinguisher 2kg', category: 'Dry Powder', agent: 'ABC Powder', capacity: '2 kg', stock: 87, min: 25, price: '$52.00', restocked: '2026-07-15', status: 'OK' },
  { sku: 'ACC-BLANKET-1M', product: 'Fire Blanket 1m x 1m', category: 'Accessories', agent: '—', capacity: '—', stock: 95, min: 40, price: '$18.00', restocked: '2026-07-20', status: 'OK' },
  { sku: 'EXT-ABC-1KG', product: 'ABC Powder Extinguisher 1kg', category: 'Dry Powder', agent: 'ABC Powder', capacity: '1 kg', stock: 142, min: 30, price: '$38.50', restocked: '2026-07-15', status: 'OK' },
  { sku: 'ACC-BRACKET-STD', product: 'Wall Bracket — Standard', category: 'Accessories', agent: '—', capacity: '—', stock: 210, min: 50, price: '$8.50', restocked: '2026-07-22', status: 'OK' },
]

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
    status === 'LOW' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
  }`}>
    {status}
  </span>
)

const Inventory = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
const [addOpen, setAddOpen] = useState(false);
  const lowCount = inventory.filter(i => i.status === 'LOW').length
  const totalUnits = inventory.reduce((sum, i) => sum + i.stock, 0)
  const inventoryValue = inventory.reduce((sum, i) => {
    const price = parseFloat(i.price.replace('$', ''))
    return sum + price * i.stock
  }, 0)

  const filtered = inventory.filter(i => {
    const matchesCategory = activeCategory === 'All' || i.category === activeCategory
    const matchesSearch =
      i.sku.toLowerCase().includes(search.toLowerCase()) ||
      i.product.toLowerCase().includes(search.toLowerCase()) ||
      i.agent.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <span className='uppercase text-3xl font-bold leading-10'>Inventory</span>
          <h2 className='text-xs text-color tracking-widest mt-1'>
            {inventory.length} PRODUCTS · {lowCount} LOW/OUT OF STOCK
          </h2>
        </div>
        <button className='bg-[#C0392B] hover:bg-[#a8321f] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors' onClick={()=>setAddOpen(true)}>
          + Add Product
        </button>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
        <Card title='Inventory Value' value={`$${inventoryValue.toLocaleString()}`} accent='#C0392B' />
        <Card title='Total Units' value={totalUnits.toLocaleString()} accent='#3B82F6' />
        <Card title='Low / Out of Stock' value={`${lowCount} items`} accent='#EAB308' />
      </div>

      {/* Search + filters */}
      <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-3'>
        <div className='relative flex-1'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-color' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Name, SKU, agent, supplier...'
            className='w-full pl-9 pr-3 py-2 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
          />
        </div>
        <div className='flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#C0392B] text-white'
                  : 'bg-gray-100 text-color hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className='mt-4 border stroke-color bg-white rounded-xl overflow-x-auto'>
        <table className='w-full text-sm min-w-[900px]'>
          <thead>
            <tr className='text-left text-[10px] uppercase text-color border-b stroke-color'>
              <th className='px-4 py-3 font-medium'>SKU</th>
              <th className='px-4 py-3 font-medium'>Product</th>
              <th className='px-4 py-3 font-medium'>Category</th>
              <th className='px-4 py-3 font-medium'>Agent</th>
              <th className='px-4 py-3 font-medium'>Capacity</th>
              <th className='px-4 py-3 font-medium'>Stock</th>
              <th className='px-4 py-3 font-medium'>Min</th>
              <th className='px-4 py-3 font-medium'>Unit Price</th>
              <th className='px-4 py-3 font-medium'>Restocked</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.sku} className='border-b stroke-color last:border-0'>
                <td className='px-4 py-3 text-color text-xs'>{item.sku}</td>
                <td className={`px-4 py-3 font-medium ${item.status === 'LOW' ? 'text-[#C0392B]' : ''}`}>
                  {item.product}
                </td>
                <td className='px-4 py-3 text-color'>{item.category}</td>
                <td className='px-4 py-3 text-color'>{item.agent}</td>
                <td className='px-4 py-3 text-color'>{item.capacity}</td>
                <td className={`px-4 py-3 font-semibold ${item.status === 'LOW' ? 'text-[#C0392B]' : ''}`}>
                  {item.stock}
                </td>
                <td className='px-4 py-3 text-color'>{item.min}</td>
                <td className='px-4 py-3 text-[#C0392B] font-medium'>{item.price}</td>
                <td className='px-4 py-3 text-color'>{item.restocked}</td>
                <td className='px-4 py-3'><StatusBadge status={item.status} /></td>
                <td className='px-4 py-3'>
                  <div className='flex gap-2 text-xs font-medium'>
                    <button className='text-green-600 hover:underline'>+Stock</button>
                    <button className='text-blue-600 hover:underline'>Edit</button>
                    <button className='text-red-600 hover:underline'>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className='px-4 py-10 text-center text-color text-sm'>No products match your search.</div>
        )}
      </div>
    <AddProductModal
  open={addOpen}
  onClose={() => setAddOpen(false)}
  existingSkus={inventory.map(p => p.sku)}
  onSave={(newProduct) => {
    // setProducts(prev => [...prev, newProduct]);
    setAddOpen(false);
  }}
/>
    </div>
  )
}

export default Inventory