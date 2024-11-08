import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?:string;
    userId?:string;
    authorId?:string;
}

export default async function getReservations(params:IParams) {
    try {
        const { listingId, userId, authorId } = params;
    
    const query: any={};

    //if we give listing id then we will get all reservations for that listing
    if (listingId) {
        query.listingId = listingId;
    }

    //if we give userId then we will get all reservations for that user
    if (userId) {
        query.userId = userId;
    }

    //if we give authorId then we will get all reservations for that author
    if (authorId) {
        query.authorId = authorId;
    }
    
    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true,
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return reservations;
    } catch (error:any) {
        console.log("Error in getReservations",error.message);
        throw new Error(error.message);    
    }
    
}

