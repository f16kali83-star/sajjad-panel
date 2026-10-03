import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const DEFAULT_ADMIN_USERNAME = "sajjad";
const DEFAULT_ADMIN_PASSWORD = "sajjad";

export async function ensureDefaultAdmin() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  if (admin) {
    return admin;
  }

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);

  return prisma.user.create({
    data: {
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
}

export async function verifyCredentials(
  username: string,
  password: string,
) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  if (user.status !== "ACTIVE") {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.passwordHash,
  );

  if (!validPassword) {
    return null;
  }

  return user;
}
