/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hook/useAuth'

type Inputs = {
  email: string
  password: string
  repassword: string
}

interface ILoginState {
  type: 'SignIn' | 'SignUp'
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const [loginState, setLoginState] = useState<ILoginState>({ type: 'SignIn' })
  const { signIn, signUp, loading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ email, password, repassword }) => {
      if (login) {
        await signIn(email, password)
      } else {
        await signUp(email, password, repassword)
      }
    },
    [login, signIn, signUp]
  )
  const renderForm = useMemo(() => {
    if (!loginState) return
    if (loginState.type === 'SignIn') {
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
          <h2 className='text-4xl font-semibold'>Sign In</h2>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input
                type='email'
                placeholder='Email'
                className={`input ${errors.email && 'border-b-2 border-orange-500'}`}
                {...register('email', { required: true })}
              />
              <p className='p-1 text-[13px] font-light  text-orange-500'>{errors.email?.message}</p>
            </label>
            <label className='inline-block w-full'>
              <input
                type='password'
                placeholder='Password'
                className={`input ${errors.password && 'border-b-2 border-orange-500'}`}
                {...register('password', { required: true })}
              />
              <p className='p-1 text-[13px] font-light  text-orange-500'>{errors.password?.message}</p>
            </label>
            <button
              onClick={() => setLogin(true)}
              className='w-full rounded bg-[#E50914] py-3 font-semibold flex justify-center'
              type='submit'>
              {loading ? (
                <div className='w-5 h-5 border-solid border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin'></div>
              ) : (
                'Sign In'
              )}
            </button>
            <div className='text-[gray]'>
              New to Netflix?{' '}
              <button
                onClick={() => setLoginState({ type: 'SignUp' })}
                className='cursor-pointer text-white hover:underline'>
                Sign up now
              </button>
            </div>
          </div>
        </form>
      )
    }
    if (loginState.type === 'SignUp') {
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
          <h2 className='text-4xl font-semibold'>Sign In</h2>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input
                type='email'
                placeholder='Email'
                className={`input ${errors.email && 'border-b-2 border-orange-500'}`}
                {...register('email', { required: true })}
              />
              <p className='p-1 text-[13px] font-light  text-orange-500'>{errors.email?.message}</p>
            </label>
            <label className='inline-block w-full'>
              <input
                type='password'
                {...register('password', { required: true })}
                placeholder='Password'
                className={`input ${errors.password && 'border-b-2 border-orange-500'}`}
              />
              <p className='p-1 text-[13px] font-light  text-orange-500'>{errors.password?.message}</p>
            </label>
            <label className='inline-block w-full'>
              <input
                type='password'
                {...register('repassword', { required: true, deps: ['password'] })}
                placeholder='Confirm Password'
                className={`input ${errors.password && 'border-b-2 border-orange-500'}`}
              />
              <p className='p-1 text-[13px] font-light  text-orange-500'>{errors.repassword?.message}</p>
            </label>
            <button
              onClick={() => setLogin(false)}
              className='w-full rounded bg-[#E50914] py-3 font-semibold  flex justify-center'
              type='submit'>
              {loading ? (
                <div className='w-5 h-5 border-solid border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin'></div>
              ) : (
                'Sign Up'
              )}
            </button>
            <div className='text-[gray]'>
              Have account?{' '}
              <button
                onClick={() => setLoginState({ type: 'SignIn' })}
                className='cursor-pointer text-white hover:underline'>
                Sign in
              </button>
            </div>
          </div>
        </form>
      )
    }
  }, [errors.email, errors.password, errors.repassword?.message, handleSubmit, loading, loginState, onSubmit, register])
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Netflix' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
        <img
          className='w-[150px] h-[150px] absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
          src='/Netflix_2015_logo.svg'
          alt='logo'
        />
        <Image
          src='/login-banner.jpeg'
          layout='fill'
          className='-z-10 !hidden opacity-60 sm:!inline'
          objectFit='cover'
          alt='login-banner'
        />
        {renderForm}
      </main>
    </>
  )
}

export default Login
