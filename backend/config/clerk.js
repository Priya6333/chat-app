import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default clerkClient;