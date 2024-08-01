'use server';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { Pet } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type PetData = Omit<Pet, 'id'>;

//Do: fix formData type any

export async function addPet(formData: any) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get('name'),
        ownerName: formData.get('ownerName'),
        age: Number(formData.get('age')),
        imageUrl:
          formData.get('imageUrl') ||
          'https://cdn3.iconfinder.com/data/icons/essential-demo/32/cat_dog_animal_paw-256.png',
        notes: formData.get('notes'),
      },
    });
  } catch (error) {
    return {
      message: "Couldn't add pet",
    };
  }

  revalidatePath('/app', 'layout');
}
