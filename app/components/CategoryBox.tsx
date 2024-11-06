"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string';

interface CategoryBoxProps{
    icon:IconType;
    label:string;
    selected?:boolean;
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    icon:Icon,  //so that we can use Icon as component
    label,
    selected
}) => {
    const router=useRouter();
    const params=useSearchParams();

    //ye kiye hai ki jab bhi koi category box pe click karega toh uska url mein chla jayega query parameter ke sath

    const handleClick=useCallback(()=>{
        let currentQuery={};
        if(params){
            currentQuery=qs.parse(params.toString());
        }

        const updatedQuery: Record<string, string | undefined> = {
            ...currentQuery,
            category:label
        }
        //doobara click karne pe category hat jaye
        if(params?.get('category')===label){
            delete updatedQuery.category;
        }

        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        },{skipNull:true});
        router.push(url);
    },[label,params,router]);
  return (
    <div 
    onClick={handleClick}
    className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'text-neutral-800 border-b-neutral-800' : 'text-neutral-500 border-transparent'}
    `}>
        <Icon size={24}/>
        <div className='font-medium text-sm'>
            {label}
            </div>
      
    </div>
  )
}

export default CategoryBox
