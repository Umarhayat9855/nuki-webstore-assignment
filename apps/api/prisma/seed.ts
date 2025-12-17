import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: "Nuki Smart Lock 4.0 Pro",
        price: 279.0,
        description: "The electronic door lock with integrated Wi-Fi and Touch for remote access.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Smart%20Lock%204.0%20Pro",
      },
      {
        name: "Nuki Smart Lock 4.0",
        price: 169.0,
        description: "The smart entry into the world of keyless living.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Smart%20Lock%204.0",
      },
      {
        name: "Nuki Keypad 2.0",
        price: 159.0,
        description: "Open your door with your fingerprint or a 6-digit code.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Keypad%202.0",
      },
      {
        name: "Nuki Bridge",
        price: 99.0,
        description: "Brings your Nuki devices online for remote control.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Bridge",
      },
      {
        name: "Nuki Opener",
        price: 129.0,
        description: "Turn your intercom into a smart door opener.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Opener",
      },
      {
        name: "Nuki Power Pack",
        price: 49.0,
        description: "Rechargeable battery pack for your Nuki Smart Lock.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Power%20Pack",
      },
      {
        name: "Nuki Fob",
        price: 39.0,
        description: "Bluetooth remote control for your Smart Lock.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Fob",
      },
      {
        name: "Nuki Door Sensor",
        price: 49.0,
        description: "Monitor your door status from anywhere.",
        imageUrl: "https://placehold.co/600x600/png?text=Nuki%20Door%20Sensor",
      },
    ],
  });

  // Create test users
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
    skipDuplicates: true,
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
