'use client'

import { useState } from 'react'
import { Song } from '@/actions/songs'
import SongList from '@/components/songs/song-list'
import SongForm from '@/components/songs/song-form'
import { logout } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { Plus, LogOut } from 'lucide-react'

export default function SongDashboard () {
  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState<Song | undefined>()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleEdit = (song: Song) => {
    setEditingSong(song)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingSong(undefined)
    window.location.reload()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-500">My Music Collection</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Song
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 text-purple-500">
                {editingSong ? 'Edit Song' : 'Add New Song'}
              </h2>
              <SongForm
                song={editingSong}
                onSuccess={handleFormSuccess}
                onCancel={() => {
                  setShowForm(false)
                  setEditingSong(undefined)
                }}
              />
            </div>
          </div>
        )}

        <SongList onEdit={handleEdit} />
      </div>
    </div>
  )
}