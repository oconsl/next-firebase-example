'use client'

import { useState, useEffect } from 'react'
import { Song, getSongs, deleteSong } from '@/actions/songs'
import { Music, Pencil, Trash2 } from 'lucide-react'
import Loader from '@/components/common/loader'
import { toast } from 'sonner'

interface SongListProps {
  onEdit: (song: Song) => void
}

export default function SongList ({ onEdit }: SongListProps) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    const result = await getSongs()
    if (Array.isArray(result)) {
      setSongs(result)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this song?')) {
      const result = await deleteSong(id)
      if (result.success) {
        toast.success('Song deleted successfully')
        loadSongs()
      } else {
        toast.error('Failed to delete song')
      }
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {songs.map((song) => (
        <div
          key={song.id}
          className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Music className="text-purple-500" />
              <div>
                <h3 className="font-medium text-gray-100">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(song)}
                className="p-1 hover:text-purple-500 transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => song.id && handleDelete(song.id)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {(song.album || song.year || song.genre) && (
            <div className="mt-2 text-sm text-gray-400">
              {song.album && <p>Album: {song.album}</p>}
              {song.year && <p>Year: {song.year}</p>}
              {song.genre && <p>Genre: {song.genre}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}