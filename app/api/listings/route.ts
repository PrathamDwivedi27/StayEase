import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(
    request:Request
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return new Response(null,{status:401});
    }

    const body=await request.json();
    const {
        title,
        description,
        imageSrc,
        price,
        location,
        category,
        roomCount,
        guestCount,
        bathroomCount
    }=body;
    Object.keys(body).forEach((value: string) => {
        if(!body[value]){
            NextResponse.error();
        }
    });

    const listing=await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue:location.value,
            price:parseInt(price),
            userId:currentUser.id
        }
    });

    return NextResponse.json(listing);
}