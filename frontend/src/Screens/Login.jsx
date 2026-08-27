import logo from "/logo.png"

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter both username and password.')
      return
    }
    setError('')
    // TODO: wire up actual auth call
    const result=await window.api.auth.login(username,password)
    if(result.success){
      localStorage.setItem("userId",result.user.id)
      localStorage.setItem("username",result.user.username)
      navigate("/overview")
    }else{
      setError('Wrong Credentials')
    }
    
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F4F5F7] p-4'>
      <div className='w-full max-w-md bg-white rounded-xl border stroke-color overflow-hidden'>
        {/* Top accent bar */}
        <div className='h-1.5 bg-[#C0392B]' />

        <div className='px-10 pt-10 pb-8'>
          {/* Logo */}
          <div className='flex justify-center mb-8'>
            <img
              src={logo}
              // alt='Damak Fire & Safety Solution'
              className='h-20 w-auto object-contain'
            />
          </div>

          {/* Heading */}
          <h1 className='uppercase text-2xl font-bold tracking-wide'>Staff Login</h1>
          <p className='text-xs text-color tracking-widest uppercase mt-1'>
            Damak Management System
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            <div>
              <label className='block text-xs uppercase tracking-wide text-color mb-2'>
                Username
              </label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter your username'
                className='w-full px-4 py-3 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
              />
            </div>

            <div>
              <label className='block text-xs uppercase tracking-wide text-color mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='w-full px-4 py-3 pr-11 text-sm border stroke-color rounded-lg outline-none focus:border-[#C0392B]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-color hover:text-black'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className='text-xs text-red-600'>{error}</p>
            )}

            <button
              type='submit'
              className='w-full bg-[#C0392B] hover:bg-[#a8321f] text-white font-bold uppercase tracking-wide py-3.5 rounded-lg transition-colors mt-2'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <p className='absolute bottom-6 text-[10px] uppercase tracking-widest text-color'>
        Damak Fire & Safety Solution · v2.1
      </p>
    </div>
  )
}

export default Login