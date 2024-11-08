"use client"
import React from 'react'

import dynamic from 'next/dynamic';

// Import CldUploadWidget dynamically with SSR disabled
const CldUploadWidget = dynamic(() => import("next-cloudinary").then((mod) => mod.CldUploadWidget), { ssr: false });

import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global{
  let cloudinary: { openUploadWidget: (options: object, callback: (error: Error | null, result: { event: string; info: { secure_url: string } }) => void) => void }
}

interface ImageUploadProps {
  onChange:(value:string)=>void
  value:string
}

const ImageUpload:React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {

  const handleUpload = useCallback((result: { event?: string; info?: string | { secure_url?: string } }) => {
      console.log('Cloudinary Upload Result:', result);
      if (result.event === 'success' && result.info && typeof result.info !== 'string' && result.info.secure_url) {
        onChange(result.info.secure_url);  // Get the final secure URL
      }
    }, [onChange]);
  
  
  
  return (
    <CldUploadWidget
    onSuccess={handleUpload}
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
