import LoginForm from '@/components/auth/login'
import Link from 'next/link'

export default function LoginPage () {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-500">Welcome Back</h1>
          <p className="mt-2 text-gray-400">Login to your music collection</p>
        </div>

        <LoginForm />

        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-purple-500 hover:text-purple-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}