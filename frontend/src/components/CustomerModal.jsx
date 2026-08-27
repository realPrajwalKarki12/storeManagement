import React, { useState } from 'react'
import { X } from 'lucide-react'

const NewCustomerModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!name.trim() || !company.trim() || !city.trim()) {
      setError('Please fill in name, company, and city.')
      return
    }
    setError('')
    onSave({
      name: name.trim(),
      company: company.trim(),
      city: city.trim(),
      email: email.trim(),
    })
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='uppercase text-xl font-bold'>New Customer</h1>
          <button onClick={onClose} className='text-color hover:text-black'>
            <X size={20} />
          </button>
        </div>

        <div className='space-y-5'>
          <div>
            <label className='block text-xs uppercase tracking-wide text-color mb-2'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter customer name'
              className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
            />
          </div>

          <div>
            <label className='block text-xs uppercase tracking-wide text-color mb-2'>Company</label>
            <input
              type='text'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder='Enter company name'
              className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
            />
          </div>

          <div>
            <label className='block text-xs uppercase tracking-wide text-color mb-2'>City</label>
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='e.g. Miami, FL'
              className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
            />
          </div>

          <div>
            <label className='block text-xs uppercase tracking-wide text-color mb-2'>
              Email <span className='normal-case text-color'>(optional)</span>
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@company.com'
              className='w-full px-4 py-2.5 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
            />
          </div>
        </div>

        {error && <p className='text-xs text-red-600 mt-4'>{error}</p>}

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

export default NewCustomerModal