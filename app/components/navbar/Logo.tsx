"use client"
import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image
        src={'/logo.jpg'}
        alt='logo'
        className='hidden md:block cursor-pointer'
        width='100'
        height='100'/>
  )
}

export default Logo
