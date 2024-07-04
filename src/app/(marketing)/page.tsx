import { PawPrint } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />
      {/* <PawPrint width={400} height={400} /> */}
      <div className="">
        <h1 className="text-5xl font-semibold my-6 max-w-[600px]">
          Manage your <span className="font-extrabold">pet daycare</span> with ease
        </h1>
        <p>
          Use PetSoft to easily keep track of pets under your care. Get lifetime access for $29.99 because we are not a
          greedy company. :3
        </p>
        <div className="mt-10"></div>
      </div>
    </main>
  );
}
