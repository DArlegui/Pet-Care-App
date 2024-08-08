import AuthForm from '@/components/_auth/auth-form';
import H1 from '@/components/_marketing/h1';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account? {''}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
