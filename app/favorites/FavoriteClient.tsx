"use client"
import { Listing, User } from '@prisma/client'
import React from 'react'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';


interface FavoriteClientProps {
    listings:Listing[];
    currentUser:User | null;
}

const FavoriteClient:React.FC<FavoriteClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Here are your favorite listings"
      />
      <div className='mt-10 grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      '>
        {listings.map((listing)=>(
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />  
        ))}

      </div>
    </Container>
  )
}

export default FavoriteClient
