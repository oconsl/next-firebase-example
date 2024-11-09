'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export interface Song {
  id?: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
  createdAt?: Date;
}

export async function addSong(song: Omit<Song, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'songs'), {
      ...song,
      createdAt: new Date(),
    });
    return { id: docRef.id, success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function getSongs() {
  try {
    const songsQuery = query(
      collection(db, 'songs'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(songsQuery);
    const songs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Song[];
    return songs;
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function updateSong(id: string, data: Partial<Song>) {
  try {
    await updateDoc(doc(db, 'songs', id), data);
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function deleteSong(id: string) {
  try {
    await deleteDoc(doc(db, 'songs', id));
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}
