import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Smart Lock 3.0',
        price: 149.00,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=800&q=80', // Smart lock / security
      },
      {
        name: 'Smart Lock 3.0 Pro',
        price: 269.00,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=800&q=80', // Same for now, or find another
      },
      {
        name: 'Nuki Opener',
        price: 99.00,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', // Tech/device
      },
      {
        name: 'Keypad 2.0',
        price: 159.00,
        imageUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80', // Keypad/security
      },
      {
        name: 'Door Sensor',
        price: 39.00,
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', // Sensor/tech
      },
      {
        name: 'Fob',
        price: 39.00,
        imageUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80', // Watch/fob like
      },
    ],
  });

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
    },
  });
  await prisma.user.createMany({
    data: [
      {
        email: 'alice@example.com',
        password: hashedPassword,
      },
      {
        email: 'bob@example.com',
        password: hashedPassword,
      },
    ],
    skipDuplicates: true, // Prevents errors if users already exist
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
