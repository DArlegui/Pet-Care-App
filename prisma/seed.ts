import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  email: 'example@gmail.com',
  password: '',
  pets: {
    create: [
      {
        name: 'Buddy',
        ownerName: 'Elon Musk',
        imageUrl: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
        age: 4,
        notes: 'Loves to play fetch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Max',
        ownerName: 'Jeff Bezos',
        imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
        age: 6,
        notes: 'Enjoys long walks on the beach',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bella',
        ownerName: 'Bill Gates',
        imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
        age: 3,
        notes: 'Very friendly and loves kids',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Charlie',
        ownerName: 'Mark Zuckerberg',
        imageUrl: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
        age: 5,
        notes: 'Great at learning new tricks',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lucy',
        ownerName: 'Tim Cook',
        imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
        age: 2,
        notes: 'Very energetic and playful',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

async function main() {
  console.log('Start seeding ...');

  const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD_EXAMPLE!, 10);
  userData.password = hashedPassword;

  await prisma.user.create({
    data: userData,
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
