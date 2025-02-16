import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      quests: {
        create: [
          {
            title: 'Quest 1',
            description: 'First quest description',
            questions: {
              create: [
                { text: 'Question 1?', answer: 'Answer 1' },
                { text: 'Question 2?', answer: 'Answer 2' },
              ],
            },
          },
          {
            title: 'Quest 3',
            description: 'Third quest description',
            questions: {
              create: [
                { text: 'Question 3?', answer: 'Answer 3' },
              ],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      email: 'user2@example.com',
    },
  });

  await prisma.quest.create({
    data: {
      title: 'Quest 4',
      description: 'Fourth quest description',
      users: {
        connect: [{ id: user2.id }],
      },
      questions: {
        create: [
          { text: 'Question 4?', answer: 'Answer 4' },
          { text: 'Question 5?', answer: 'Answer 5' },
          { text: 'Question 2?', answer: 'Answer 2' },
        ],
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
