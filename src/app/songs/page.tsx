import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SongDashboard from './song-dashboard'

export default async function SongsPage () {
  const cookiesStore = await cookies()
  const session = cookiesStore.get('session')

  if (!session) {
    redirect('/login')
  }

  return <SongDashboard />
}