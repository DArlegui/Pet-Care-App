'use server';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { checkAuth, getPetById } from '@/lib/server-utils';
import { sleep } from '@/lib/utils';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/validations';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// -- User Actions --
export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data' };
  }

  try {
    // Validates through auth.ts, adding callbackUrl for redirection
    const result = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false, // avoid automatic redirect
      // callbackUrl: '/dashboard', // explicitly redirect to dashboard
    });

    // After successful login, programmatically redirect to the correct page
    if (result) redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials' };
        default:
          return { message: 'An error occurred' };
      }
    }
    throw error;
  }
}

export async function signUp(prevState: unknown, formData: unknown) {
  await sleep(1000);

  //check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data' };
  }

  //convert FormData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  //Validates type
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) return { message: 'Invalid form data' };

  //Extract email and password, hashes password
  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // // Check if email already exists
  // const existingUser = await getUserByEmail(email);

  // if (existingUser) {
  //   // Handle case where email already exists
  //   throw new Error('A user with this email already exists.');
  // }

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { message: 'Email already exists' };
      }
    }

    return { message: "Couldn't create user" };
  }

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
  const pet = await getPetById(validatedPetId.data);

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
  const pet = await getPetById(validatedPetId.data);

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
