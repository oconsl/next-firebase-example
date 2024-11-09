'use client'

import { useState } from 'react'
import { signIn } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Loader from '@/components/common/loader'

export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error)
      toast.error('Login failed')
      setLoading(false)
    } else {
      toast.success(`Welcome back!`)
      router.push('/songs')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      {loading ? <Loader /> : (
        <>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </>
      )}
    </form>
  )
}