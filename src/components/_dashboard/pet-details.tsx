'use client';
import { usePetContext } from '@/lib/hooks';
import { PetProps } from '@/lib/types';
import Image from 'next/image';
import PetButton from './pet-button';

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <Info pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="flex items-center justify-center h-full text-zinc-800 text-3xl font-medium">
      Select a pet to view details
    </p>
  );
}

function TopBar({ pet }: { pet: PetProps }) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center bg-white px-8 p-5 border-b-1 border-light">
      <Image
        src={pet?.imageUrl!}
        alt=""
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton actionType="checkout" onClick={() => handleCheckoutPet(pet.id)}>
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function Info({ pet }: { pet: PetProps }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner Name</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: { pet: PetProps }) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Notes:</h3>
      <p className="mt-1 text-lg text-zinc-800">{pet?.notes}</p>
    </section>
  );
}
