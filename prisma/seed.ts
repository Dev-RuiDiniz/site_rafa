import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@shr.com.br" },
    update: { password: hashedPassword },
    create: {
      email: "admin@shr.com.br",
      password: hashedPassword,
      name: "Administrador",
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Admin criado:");
  console.log("   Email: admin@shr.com.br");
  console.log("   Senha: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
