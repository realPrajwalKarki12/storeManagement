import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tabs = ['Account', 'Change Password', 'Sign Out']

const getPasswordStrength = (password) => {
  if (password.length === 0) return { label: '', score: 0 }
  if (password.length < 6) return { label: 'Too Short', score: 1 }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { label: 'Weak', score: 1 }
  if (score === 2) return { label: 'Good', score: 2 }
  return { label: 'Strong', score: 3 }
}

const strengthStyles = {
  0: { bar: 'bg-gray-200', text: 'text-color', width: '0%' },
  1: { bar: 'bg-red-500', text: 'text-red-600', width: '33%' },
  2: { bar: 'bg-yellow-500', text: 'text-yellow-600', width: '66%' },
  3: { bar: 'bg-green-500', text: 'text-green-600', width: '100%' },
}

const AccountTab = () => {
 

  const [saved, setSaved] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const handleSave = async() => {
    // TODO: wire up real account update call
    // const userId=localStorage.getItem("userId");
    const userId=localStorage.getItem("userId")
    const result=await window.api.auth.changeUserName(userId,username)
    if(result.success){
      localStorage.setItem("username",username)
setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    }
    
  }

  return (
    <div>
      <h2 className='uppercase text-sm font-semibold tracking-wide mb-4'>Account Details</h2>

      <div className='border stroke-color rounded-xl p-5 flex items-center gap-4 mb-6'>
        <div className='w-14 h-14 rounded-full bg-[#C0392B] text-white flex items-center justify-center text-xl font-bold'>
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className='font-bold text-lg leading-tight'>{username}</p>
          <p className='text-xs text-color uppercase tracking-wide'>System Administrator</p>
        </div>
      </div>

      <label className='block text-xs uppercase tracking-wide text-color mb-2'>Username</label>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-full px-4 py-3 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] mb-5'
      />

      <label className='block text-xs uppercase tracking-wide text-color mb-2'>Role</label>
      <input
        type='text'
        value='System Administrator'
        disabled
        className='w-full px-4 py-3 text-sm border stroke-color rounded-lg bg-gray-50 text-color mb-6'
      />

      <button
        onClick={handleSave}
        className='bg-[#C0392B] hover:bg-[#a8321f] text-white font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-lg transition-colors'
      >
        Save Changes
      </button>
      {saved && <p className='text-green-600 text-xs mt-3'>Changes saved.</p>}
    </div>
  )
}

const ChangePasswordTab = () => {
  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
    // const [username, setUsername] = useState(localStorage.getItem("username"))
    const userId=localStorage.getItem("userId")
  
  const strength = getPasswordStrength(newPassword)
  const style = strengthStyles[strength.score]

  const handleSave = async() => {
    if (!currentPassword) {
      setMessage({ type: 'error', text: 'Please fill in both fields.' })
      return
    }
    if (!newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in both fields.' })
      return
    }
    if (strength.score === 1) {
      setMessage({ type: 'error', text: 'Password is too weak. Try adding numbers or symbols.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }
    // TODO: wire up real password change call
    const result=await window.api.auth.changePassword(userId,currentPassword,newPassword)
    if(result.success){
 setMessage({ type: 'success', text: 'Password updated successfully.' })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    }
   
  }

  return (
    <div>
      <h2 className='uppercase text-sm font-semibold tracking-wide mb-4'>Change Password</h2>
       <label className='block text-xs uppercase tracking-wide text-color mb-2'>New Password</label>
      <input
        type='password'
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder='Enter new password'
        className='w-full px-4 py-3 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] mb-2'
      />
      <label className='block text-xs uppercase tracking-wide text-color mb-2'>New Password</label>
      <input
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder='Enter new password'
        className='w-full px-4 py-3 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
      />

      {newPassword.length > 0 && (
        <div className='mt-2 mb-5'>
          <div className='h-1.5 w-full bg-gray-100 rounded-full overflow-hidden'>
            <div
              className={`h-full rounded-full transition-all ${style.bar}`}
              style={{ width: style.width }}
            />
          </div>
          <p className={`text-xs mt-1 font-medium ${style.text}`}>{strength.label}</p>
        </div>
      )}
      {newPassword.length === 0 && <div className='mb-5' />}

      <label className='block text-xs uppercase tracking-wide text-color mb-2'>Confirm Password</label>
      <input
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='Re-enter new password'
        className='w-full px-4 py-3 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B] mb-6'
      />

      <button
        onClick={handleSave}
        className='bg-[#C0392B] hover:bg-[#a8321f] text-white font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-lg transition-colors'
      >
        Save Changes
      </button>

      {message && (
        <p className={`text-xs mt-3 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account')
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
    if (tab === 'Sign Out') {
      // TODO: clear real auth/session state here
      navigate('/')
      return
    }
    setActiveTab(tab)
  }

  return (
    <div>
      <div>
        <span className='uppercase text-3xl font-bold leading-10'>Settings</span>
        <h2 className='text-xs text-color tracking-widest mt-1'>ACCOUNT &amp; SECURITY</h2>
      </div>

      <div className='h-px bg-gray-200 my-6' />

      <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6'>
        {/* Left tab nav */}
        <div className='border stroke-color rounded-xl overflow-hidden h-fit'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                activeTab === tab
                  ? 'border-[#C0392B] text-[#C0392B] bg-red-50'
                  : tab === 'Sign Out'
                  ? 'border-transparent text-color hover:bg-gray-50'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className='border stroke-color rounded-xl p-6 bg-white'>
          {activeTab === 'Account' && <AccountTab />}
          {activeTab === 'Change Password' && <ChangePasswordTab />}
        </div>
      </div>
    </div>
  )
}

export default Settings