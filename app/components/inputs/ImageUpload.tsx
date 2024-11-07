"use client"
import React from 'react'

import {CldUploadWidget} from "next-cloudinary"
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global{
  let cloudinary: any
}

interface ImageUploadProps {
  onChange:(value:string)=>void
  value:string
}

const ImageUpload:React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {

  const handleUpload = useCallback((result: any) => {
    console.log('Cloudinary Upload Result:', result);
    if (result?.event === 'upload-complete' && result?.info?.secure_url) {
      onChange(result.info.secure_url);  // Get the final secure URL
    }
  }, [onChange]);
  
  
  
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='g9qm1kv7'
      options={{
        maxFiles:1,
      }}
    >
      {({open})=>{
        return (
          <div
            onClick={()=>open?.()}
            className='relative cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            p-20
            border-neutral-300
            flex 
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            '
          >
            <TbPhotoPlus size={50}/>
            <div className='font-semibold text-lg'>
              Click to upload
            </div>
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  alt='Upload'
                  fill
                  style={{objectFit:'cover'}}
                  src={value || '/logo.jpg'}
                />
              </div>
            )}
          </div>
        )
      }}
      
    </CldUploadWidget>
  )
}

export default ImageUpload
