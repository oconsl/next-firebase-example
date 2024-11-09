'use server';

import { cookies } from 'next/headers';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Store the user token in an encrypted cookie
    const cookiesStore = await cookies();
    cookiesStore.set('session', await user.getIdToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    const cookiesStore = await cookies();
    cookiesStore.set('session', await user.getIdToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete('session');
  await auth.signOut();
  return { success: true };
}
