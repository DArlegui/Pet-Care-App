import { Pet, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PetWithoutId = Omit<Pet, 'id'>;

const pets: PetWithoutId[] = [
  {
    name: 'Buddy',
    ownerName: 'Elon Musk',
    imageUrl: 'https://images.unsplash.com/photo-1568572933382-0d3b3f7e6b2d',
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
    imageUrl: 'https://images.unsplash.com/photo-1598136498121-0cc7b3b1b2e3',
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
];

async function main() {
  console.log('Start seeding ...');

  for (const pet of pets) {
    const result = await prisma.pet.create({
      data: { ...pet },
    });
    console.log(`Created pet with id: ${result.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
