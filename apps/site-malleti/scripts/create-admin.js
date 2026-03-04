import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || "admin@maletti.local";
  const password = process.argv[3] || "Senha@123";
  const name = process.argv[4] || "Admin Local";

  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.js <email> <password> [name]");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {
      password: hashedPassword,
      name,
      role: "SUPER_ADMIN",
    },
    create: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Admin ready:", { email: user.email, name: user.name, role: user.role });
  console.log("Temporary password:", password);
}

main()
  .catch((err) => {
    console.error("Failed to create admin:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
