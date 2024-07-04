import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import logo from '../../public/logo.svg';

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="PetCare logo" />
      </Link>
    </div>
  );
}
