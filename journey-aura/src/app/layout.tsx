import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
})

export const metadata: Metadata = {
  title: "Journey Aura",
  description: "Rail Ticket Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="overflow-hidden flex flex-col">
          <div className="m-6">
            <div className="flex flex-row justify-between items-center container h-14 rounded-full  bg-zinc-400">
              <div className="">logo</div>
              <div className="flex flex-row space-x-4">
                <div>Login</div>
                <div>SignUp</div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
