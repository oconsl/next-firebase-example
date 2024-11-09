import RegisterForm from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage () {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-500">Create Account</h1>
          <p className="mt-2 text-gray-400">Join to manage your music collection</p>
        </div>

        <RegisterForm />

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-500 hover:text-purple-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}