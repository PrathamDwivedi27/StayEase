import { Listing, Reservation, User } from '@prisma/client'
import React from 'react'

interface ListingClientProps {
      reservations?:Reservation[];
      listing:Listing & {
        user:User
      };
      currentUser?:User | null;
}

const ListingClient :React.FC<ListingClientProps>= ({
    listing,
    currentUser
}) => {
  return (
    <div>
      
    </div>
  )
}

export default ListingClient
