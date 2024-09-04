'use server';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { checkAuth } from '@/lib/server-utils';
import { sleep } from '@/lib/utils';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// -- User Actions --
export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  await signIn('credentials', authData);
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // Handle case where email already exists
    throw new Error('A user with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Redirect to login page after successful signup
  redirect('/login');
}

export async function logOut() {
  'use server';

  await signOut({ redirectTo: '/login' });
}

// -- Pet Actions --

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success) return { message: 'Invalid pet data' };

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Couldn't add pet" };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return { message: 'Invalid pet ID' };
  }

  //authorization check (user own's pet)
  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: { userId: true },
  });

  if (!pet) return { message: 'Pet not found' };
  if (pet.userId !== session.user.id) return { message: 'Unauthorized' };

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Couldn't edit pet" };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: unknown) {
  await sleep(1000);

  // authenticaiton check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) return { message: 'Invalid pet ID' };

  // authorization check (user own's pet)
  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: { userId: true },
  });
  if (!pet || pet.userId !== session.user.id) {
    return { message: 'Unauthorized' };
  }

  // database mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return { message: "Couldn't delete pet" };
  }

  revalidatePath('/app', 'layout');
}
