"use client";
import React, { useCallback } from 'react'
import Container from '../components/Container';
import Heading from '../components/Heading';
import { Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';


interface ReservationClientProps {
    reservations:Reservation[];
    currentUser:User | null;
}

const ReservationClient:React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router=useRouter();
    const [deletingId,setDeletingId]=React.useState('');

    const onCancel=useCallback((id:string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch(()=>{
            toast.error('Failed to cancel reservation');
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router])
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings made on your property"
      />
      <div className='mt-10 grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      '>
        {reservations.map((reservation)=>(
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId===reservation.id}
                actionLabel='Cancel guest reservation'
                currentUser={currentUser}
            />
        ))}

      </div>
    </Container>
  )
}

export default ReservationClient
