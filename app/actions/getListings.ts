import prisma from "@/app/libs/prismadb"

export interface IListingProps{
    userId?:string;
}

export default async function getListings(
    params:IListingProps
){
    try {
        const {userId}=await params;

        let query:any={};

        if(userId){
            query.userId=userId;
        }
        const listings=await prisma.listing.findMany({
            where:query,
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