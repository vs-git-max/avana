import bcrypt from "bcryptjs";
import prisma from "./seed.ts";

async function main() {
  const email = "samchris12737@gmail.com";
  const password = "csam4649";
  const name = "Sam Chris";

  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" },
  });

  if (existingSuperAdmin) return;

  const hashedPassword = await bcrypt.hash(password, 10);
  const superAdminUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Super admin created successfully", superAdminUser.email);
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
