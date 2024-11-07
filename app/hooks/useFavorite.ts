"use client"

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLoginModal } from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";




interface FavoriteProps{
    listingId:string;
    currentUser?:User | null;
}

const useFavorite=({listingId,currentUser}:FavoriteProps)=>{
    const router=useRouter();
    const loginModal=useLoginModal();

    const hasFavorited=useMemo(()=>{
        const list=currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[currentUser,listingId]);

    const toggleFavorite=useCallback(async(e:React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
            
        }

        try {
            let request;
            if(hasFavorited){
                request=()=>axios.delete(`/api/favorites/${listingId}`);
            }
            else{
                request=()=>axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Favorite updated");
            
        } catch (error) {
            toast.error("Failed to update favorite");
        }
    },[currentUser,hasFavorited,listingId,loginModal,router]);
    
    return {hasFavorited,toggleFavorite};
}

export default useFavorite;

