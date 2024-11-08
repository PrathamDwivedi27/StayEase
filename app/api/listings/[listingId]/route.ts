import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams{
    listingId?: string
}

export async function DELETE(
    request:Request,
    {params}: {params:IParams}
){
    const currentUser=await getCurrentUser();
    if(!currentUser){
        throw new Error('Not authenticated');
    }

    const {listingId}= params;
    if(!listingId || typeof listingId!=="string"){
        throw new Error('Invalid reservation ID');
    }

    const listing=await prisma.listing.deleteMany({
        where:{
            id:listingId,
            //only the owner/current user of listing can delete
            userId:currentUser.id
        }
    })
    return NextResponse.json(listing);
}