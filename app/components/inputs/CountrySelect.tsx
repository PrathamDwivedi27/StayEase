"use client"
import useCountries from '@/app/hooks/useCountries';
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue={
    flag:string;
    label:string;
    value:string;
    region:string;
    latlng:number[]
}

interface CountrySelectProps{
    value:CountrySelectValue;
    onChange:(value:CountrySelectValue)=>void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const {getAll}=useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value)=>onChange(value as CountrySelectValue)}
        formatOptionLabel={(option)=>(
            <div className='flex flex-row items-center gap-3'>
                <div>{option.flag}</div>
                <div>
                    {option.label},
                    <span className='ml-2 text-neutral-500'>{option.region}</span>
                </div>
            </div>
        )}
        classNames={{
            control:()=>'p-1 border-2',
            input:()=>'text-lg',
            option:()=>'text-lg',
        }}
        theme={(theme)=>({
            ...theme,
            colors:{
                ...theme.colors,
                primary25:'#ffe4e6',
                primary:'black',
            }
        })}
      />
    </div>
  )
}

export default CountrySelect
