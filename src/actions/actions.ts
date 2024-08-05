'use server';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

//Do: fix formData type any

export async function addPet(pet: any) {
  // await sleep(2000);

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "Couldn't add pet",
    };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: string, newPetData: any) {
  // await sleep(2000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "Couldn't edit pet",
    };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: string) {
  await sleep(2000);

  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return { message: "Couldn't delete pet" };
  }

  revalidatePath('/app', 'layout');
}
