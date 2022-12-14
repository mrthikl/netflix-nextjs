/* eslint-disable @next/next/no-img-element */
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useAuth from '../hook/useAuth'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true)
  //     } else {
  //       setIsScrolled(false)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  return (
    <header className={` bg-[#141414] header`}>
      <div className='flex items-center space-x-2 md:space-x-3'>
        <img alt='' src='/Netflix_2015_logo.svg' width={100} height={100} className='cursor-pointer object-contain' />
        <ul className='hidden space-x-4 md:flex'>
          <li className='header-link'>Home</li>
          <li className='header-link'>TV Shows</li>
          <li className='header-link'>Movies</li>
          <li className='header-link'>News & Popular</li>
          <li className='header-link'>My List</li>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-sm font-light'>
        <SearchIcon className='hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className=' h-6 w-6 ' />

        <img className='cursor-pointer' onClick={() => logout()} src='/account.png' alt='account' />
      </div>
    </header>
  )
}

export default Header
