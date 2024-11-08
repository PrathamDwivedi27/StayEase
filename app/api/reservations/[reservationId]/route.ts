import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error('Not authenticated');
    }

    const url = new URL(request.url); // Get URL object
    const reservationId = url.searchParams.get('reservationId'); 
    if (!reservationId || typeof reservationId !== "string") {
        throw new Error('Invalid reservation ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // Allow deletion by the user who created the reservation OR the owner of the listing
            OR: [
                { userId: currentUser.id }, 
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}