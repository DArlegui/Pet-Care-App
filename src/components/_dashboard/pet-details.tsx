'use client';
import { usePetContext } from '@/lib/hooks';
import Image from 'next/image';

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {selectedPet === undefined ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-zinc-800 text-3xl font-medium">Select a pet to view details</p>
        </div>
      ) : (
        <>
          <div className="flex items-center bg-white px-8 p-5 border-b-1 border-black/[0.08]">
            <Image
              src={selectedPet?.imageUrl!}
              alt=""
              height={75}
              width={75}
              className="h-[75px] w-[75px] rounded-full object-cover"
            />
            <h2 className="text-3xl font-semibold leading-7 ml-5">{selectedPet?.name}</h2>
          </div>

          <div className="flex justify-around py-10 px-5 text-center">
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner Name</h3>
              <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
              <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
            </div>
          </div>

          <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-black/[0.08]">
            <h3 className="text-[13px] font-medium uppercase text-zinc-700">Notes:</h3>
            <p className="mt-1 text-lg text-zinc-800">{selectedPet?.notes}</p>
          </section>
        </>
      )}
    </section>
  );
}
