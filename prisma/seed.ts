import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.challenge.createMany({
    data: [
      {
        name: 'Dry January',
        description: "Pendant 15 jours, pas une seule goutte d'alcool",
        value: 100,
        color: '#7cd3fc',
        startDate: new Date('2025-01-13'),
        endDate: new Date('2025-01-28'),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
