import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
    context: Record<string, never> // Use `Record<string, any>` for flexible typing
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = context.params;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId");
    }

    const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    context: Record<string, never> // Use `Record<string, any>` for flexible typing
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = context.params;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}
