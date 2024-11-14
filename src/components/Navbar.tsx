import { useState } from 'react'
import { Link } from "react-router-dom";


function Navbar() {
  const [ isOpen, setIsOpen ] = useState(false);

  const NavLinkClass = 'text-gray-100 font-bold text-sm px-2 py-1 border-2 border-gray-100 text-center hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300'

  return (
    <nav className='bg-gray-800 text-white fixed w-full z-10 mb-8'>
      <div className='max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex flex-row w-full justify-between'>
            <Link to='/'><div className='text-xl font-bold'>
              FFSD Group Blog
            </div></Link>
            <div className='hidden md:block'>
              <div className='flex ml-10 items-baseline space-x-2'>
                <Link to='/post' className={NavLinkClass}>Create Post</Link>
                <Link to='/login' className={NavLinkClass}>Login</Link>
                <Link to='/register' className={NavLinkClass}>Register</Link>
              </div>
            </div>
          </div>
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} type='button' className='fill-gray-100'> 
            <svg viewBox="0 0 100 80" width="40" height="40" fill='white'>
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
            </button>
          </div>
        </div>
      </div>
      {
        isOpen && (
          <div className='flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2'>
            <Link to='/post' onClick={() => setIsOpen(!isOpen)} className={NavLinkClass}>Create Post</Link>
                <Link to='/login' onClick={() => setIsOpen(!isOpen)} className={NavLinkClass}>Login</Link>
                <Link to='/register' onClick={() => setIsOpen(!isOpen)} className={NavLinkClass}>Register</Link>
          </div>
        )
      }
    </nav>
  )
}

export default Navbar