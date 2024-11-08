import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams{
    reservationId?: string
}

export async function DELETE(
    request:Request,
    {params}: {params:IParams}
){
    const currentUser=await getCurrentUser();
    if(!currentUser){
        throw new Error('Not authenticated');
    }

    const {reservationId}=await params;
    if(!reservationId || typeof reservationId!=="string"){
        throw new Error('Invalid reservation ID');
    }

    const reservation=await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            // Only allow the user who created the reservation to delete it or the creator of the listing that the reservation is for
            // matlab mein delete kar sakta hoo jiski property hai ya jisne reservation kiya hai
            OR:[
                {userId:currentUser.id},
                {listing:{userId:currentUser.id}}
            ]
        }
    })
    return NextResponse.json(reservation);
}