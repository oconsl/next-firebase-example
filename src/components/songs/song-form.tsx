'use client'

import { useState } from 'react'
import { addSong, updateSong, Song } from '@/actions/songs'
import Loader from '@/components/common/loader'
import { toast } from 'sonner'

interface SongFormProps {
  song?: Song
  onSuccess?: () => void
  onCancel?: () => void
}

export default function SongForm ({ song, onSuccess, onCancel }: SongFormProps) {
  const [formData, setFormData] = useState({
    title: song?.title || '',
    artist: song?.artist || '',
    album: song?.album || '',
    year: song?.year || undefined,
    genre: song?.genre || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (song?.id) {
        const result = await updateSong(song.id, formData)
        if (result.success) {
          toast.success('Song updated successfully')
          onSuccess?.()
        } else {
          toast.error('Failed to update song')
        }
      } else {
        const result = await addSong(formData)
        if (result.success) {
          toast.success('Song added successfully')
          onSuccess?.()
        } else {
          toast.error('Failed to add song')
        }
      }
    } catch {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loading ? <Loader /> : (
        <>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-gray-200">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              value={formData.artist}
              onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="album" className="block text-sm font-medium text-gray-200">
              Album
            </label>
            <input
              type="text"
              id="album"
              value={formData.album}
              onChange={(e) => setFormData(prev => ({ ...prev, album: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-200">
                Year
              </label>
              <input
                type="number"
                id="year"
                value={formData.year || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-200">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                value={formData.genre}
                onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-md"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : song?.id ? 'Update Song' : 'Add Song'}
            </button>
          </div>
        </>
      )}
    </form>
  )
}