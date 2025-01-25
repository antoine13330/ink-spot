import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Création d'un utilisateur
  const passwordHash = await hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: passwordHash,
      role: "USER",
    },
  });

  // Création d'un compte
  await prisma.account.create({
    data: {
      userId: user.id,
      type: "oauth",
      provider: "google",
      providerAccountId: "1234567890",
    },
  });

  // Création d'une session
  await prisma.session.create({
    data: {
      userId: user.id,
      sessionToken: "random-session-token",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 jours
    },
  });

  // Création d'un deuxième utilisateur
  const user2 = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: passwordHash,
      role: "USER",
    },
  });

  // Création d'un message entre utilisateurs
  await prisma.message.create({
    data: {
      content: "Salut Jane !",
      senderId: user.id,
      receiverId: user2.id,
    },
  });

  // Création d'un rendez-vous
  const appointment = await prisma.appointment.create({
    data: {
      date: new Date(),
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // Demain
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 25), // +1h
      status: "CONFIRMED",
      price: 100.0,
      userId: user.id,
      artistId: user2.id,
    },
  });

  // Création d'un paiement
  await prisma.payment.create({
    data: {
      amount: appointment.price,
      currency: "USD",
      status: "COMPLETED",
      appointments: { connect: { id: appointment.id } },
    },
  });

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
