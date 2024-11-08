import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import ReservationClient from "./ReservationClient";

const ReservationPage=async()=>{
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }
    //We want all the reservations of different users on my listing
    const reservations=await getReservations({
        authorId:currentUser.id
    })

    if(reservations.length===0){
        return(
            <ClientOnly>
            <EmptyState
                title="No reservations"
                subtitle="Looks ike you have no reservations on your property yet"
            />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationPage;