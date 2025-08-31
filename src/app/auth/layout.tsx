import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <h1 style={{ color: 'black' }}>Layout</h1>
      <Link style={{ color: 'black' }} href="auth/SignIn">
        Auth
      </Link>
      <Link style={{ color: 'black' }} href="auth/SignUp">
        Reg
      </Link>
      {children}
    </>
  );
}
