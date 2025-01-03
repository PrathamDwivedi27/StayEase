"use client";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  value: number;
  subtitle: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  value,
  subtitle,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px]
                flex items-center justify-center cursor-pointer
                text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-lg text-neutral-600">
            {value}
        </div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px]
                flex items-center justify-center cursor-pointer
                text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
