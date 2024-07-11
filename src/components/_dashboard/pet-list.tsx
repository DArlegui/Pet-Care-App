import React from 'react';
import Image from 'next/image';

export default function PetList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      <li>
        <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] transition">
          <Image
            src="https://cdn3.iconfinder.com/data/icons/animal-40/128/Animal_Dog-256.png"
            alt="Pet Image"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p className="font-semibold">Benjamin</p>
        </button>
      </li>
    </ul>
  );
}
