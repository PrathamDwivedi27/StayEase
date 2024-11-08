"use client"

import useCountries from '@/app/hooks/useCountries';
import { User } from '@prisma/client';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';


interface ListingHeadProps {
    title:string;
    imageSrc:string;
    locationValue:string;
    id:string;
    currentUser?:User | null;
}

const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {

    const {getByValue}=useCountries();
    const location=getByValue(locationValue);
  return (
    <>
     <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
     /> 
     <div className='
        w-full
        h-[60vh]
        relative
        overflow-hidden
        rounded-xl
     '>
        <Image
            alt='Image'
            src={imageSrc}
            fill
            className='object-cover w-full'
        
        />
        <div className='absolute top-5 right-5'>
            <HeartButton
                listingId={id}
                currentUser={currentUser}
            />
        </div>
     </div>
    </>
  )
}

export default ListingHead
