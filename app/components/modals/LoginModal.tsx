"use client"
import React from 'react'
import {signIn} from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'


const LoginModal = () => {
    const router=useRouter();
    const registerModal = useRegisterModal()
    const loginModal=useLoginModal();
    
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, 
        formState:{
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }     
    });

    // const [error, setError] = useState('')

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        
        signIn('credentials',{
            ...data,
            redirect:false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.error){
                toast.error(callback.error)
            }
            
            if(callback?.ok){
                loginModal.onClose()
                router.refresh()
                toast.success('Logged in successfully')
            }
        })
    }

    // const handleGoogleLogin = useCallback(() => {
    //     window.location.href = '/api/auth/google'
    // },[])

    // const handleGithubLogin = useCallback(() => {
    //     window.location.href = '/api/auth/github'
    // },[])

    if (!registerModal) return null;

    const bodyContent=(
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subtitle='Login to your account'
            />
            
             <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
             <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent=(
        <div className='flex flex-col gap-4'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className=' justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?    
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal
