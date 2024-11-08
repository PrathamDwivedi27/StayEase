import prisma from "@/app/libs/prismadb"

export interface IListingProps{
    userId?:string;
    guestCount?:number;
    roomCount?:number;
    bathroomCount?:number;
    startDate?:string;
    endDate?:string;
    locationValue?:string;
    category?:string
}

export default async function getListings(
    params:IListingProps
){
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category,
        }= await params;

        let query:any={};

        if(userId){
            query.userId=userId;
        }

        if(category){
            query.category=category;
        }

        if(guestCount){
            query.guestCount={
                gte: +guestCount        //to definately make number
            }
        }

        if(roomCount){
            query.roomCount={
                gte: +roomCount        //to definately make number
            }
        }

        if(bathroomCount){
            query.bathroomCount={
                gte: +bathroomCount        //to definately make number
            }
        }

        if(locationValue){
            query.locationValue=locationValue;
        }

        if(startDate && endDate){
            query.NOT={
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate:{gte:startDate},
                                startDate:{lte:startDate}
                            },
                            {
                                startDate:{lte:endDate},
                                endDate:{gte:endDate}
                            }
                        ]
                    }
                }
            }
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