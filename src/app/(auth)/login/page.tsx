import AuthForm from '@/components/_auth/auth-form';
import H1 from '@/components/_marketing/h1';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main>
      <H1 className="text-center mb-5">Log in</H1>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        No Account yet? {''}
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
