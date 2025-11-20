import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import NavBar from './components/navbar';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}