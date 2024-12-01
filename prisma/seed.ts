import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.sport.createMany({
    data: [
      { name: 'Running', value: 8, icon: 'running' },
      { name: 'Cyclisme', value: 7, icon: 'cycling' },
      { name: 'Natation', value: 9, icon: 'swimming' },
      { name: 'Marche', value: 5, icon: 'walking' },
      { name: 'Sports de combat', value: 8, icon: 'fight' },
      { name: 'Sports doux', value: 5, icon: 'yoga' },
      { name: 'Sports collectifs', value: 6, icon: 'football' },
      { name: 'Sports de raquettes', value: 7, icon: 'tennis' },
      { name: "Sports d'hiver", value: 6, icon: 'ski' },
      { name: 'Fitness', value: 7, icon: 'fitness' },
      { name: 'Crossfit', value: 9, icon: 'crossfit' },
      { name: 'Escalade', value: 9, icon: 'climbing' },
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
