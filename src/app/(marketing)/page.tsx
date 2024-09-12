import { Button } from '@/components/ui/button';
import { PawPrint } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';
import Logo from '@/components/_root/logo';

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />
      <div className="">
        {/* <PawPrint width={24} height={24} strokeWidth={2} /> */}
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[600px]">
          Manage your <span className="font-extrabold">pet daycare</span> with ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime access for only $29.99.
        </p>
        <div className="mt-10 space-x-2">
          <Button className="bg-emerald-600">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
