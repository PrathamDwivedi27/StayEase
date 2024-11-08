import React from 'react'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams{
    listingId?:string
}

// this is server side component so we cant do React.FC

const ListingPage = async({params}:{params:IParams}) => {
    const listing=await getListingById(params);
    const reservations=await getReservations(params);       //params whi ki kya bheje hai agar user to us user ke saare reservations agar listing id to us id ke saare reservation
    const currentUser=await getCurrentUser();


    if(!listing) return 
    <ClientOnly>
        <EmptyState/>
    </ClientOnly>
  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
        
    </ClientOnly>
  )
}

export default ListingPage
