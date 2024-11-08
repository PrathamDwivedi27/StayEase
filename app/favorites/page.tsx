import getFavoriteListings from "../actions/getFavoriteListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoriteClient from "./FavoriteClient";
import getCurrentUser from "../actions/getCurrentUser";


const ListingPage=async()=>{
    const listings=await getFavoriteListings();
    const currentUser=await getCurrentUser();
    
    if(listings.length===0){
    return (
        <ClientOnly>
            <EmptyState
                title="No favorites yet"
                subtitle="Looks like you haven't favorited any listings yet"
            />
        </ClientOnly>
    )
    }

    return (
        <ClientOnly>
            <FavoriteClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default ListingPage;