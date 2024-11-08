import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error('Not authenticated');
    }

    const url = new URL(request.url); // Create URL object from the request URL
    const listingId = url.searchParams.get('listingId');  // Get listingId from URL
    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid reservation ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id // Only the owner can delete
        }
    });

    return NextResponse.json(listing);
}