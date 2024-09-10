'use client';
import { logIn, signUp } from '@/actions/actions';
import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import AuthFormBtn from './auth-form-btn';

interface AuthFormProps {
  type: 'logIn' | 'signUp';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchlogIn] = useFormState(logIn, undefined);

  return (
    <form action={type === 'logIn' ? dispatchlogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" required maxLength={100} />
      </div>
      <div className="space-y-1 mt-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" required maxLength={100} minLength={8} />
      </div>
      <AuthFormBtn type={type} />

      {signUpError && <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>}
      {logInError && <p className="text-red-500 text-sm mt-2">{logInError.message}</p>}
    </form>
  );
}
