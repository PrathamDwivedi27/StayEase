import prisma from "@/app/libs/prismadb"

export default async function getListings(){
    try {
        const listings=await prisma.listing.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return listings;
    } catch (error) {
        console.log("Error occured in fetching listed places ",error);
        throw new Error;
    }
}