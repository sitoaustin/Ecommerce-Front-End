import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { PaystackConsumer, PaystackButton } from 'react-paystack';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }: any) => {
      if (user.email && user.name) {
        const newCustomer = await fetch('https://api.paystack.co/customer', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });
        const data = await newCustomer.json();
        await prisma.user.update({
          where: { id: user.id },
          data: { paystackcustomerId: data.data.id },
        });
      }
    },
  },
};

export default NextAuth(authOptions);
