import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string, repassword: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const [error, setError] = useState(null)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
        } else {
          // Not logged in...
          setUser(null)
          router.push('/login')
        }
      }),
    [router]
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user)
          router.push('/')
          setLoading(false)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    },
    [router]
  )

  const signUp = useCallback(
    async (email: string, password: string, repassword: string) => {
      setLoading(true)
      if (repassword == password) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
          })
          .catch((error) => alert(error.message))
          .finally(() => setLoading(false))
      } else {
        alert('The passwords do not match')
      }
    },
    [router]
  )

  const logout = useCallback(async () => {
    signOut(auth)
      .then(() => {
        setUser(null)
        router.push('/login')
      })
      .catch((error) => alert(error.message))
  }, [router])

  const memoeValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [error, loading, logout, signIn, signUp, user]
  )
  return <AuthContext.Provider value={memoeValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
