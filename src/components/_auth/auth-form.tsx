import { logIn, signUp } from '@/actions/actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AuthFormProps {
  type: 'logIn' | 'signUp';
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === 'logIn' ? logIn : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" />
      </div>
      <div className="space-y-1 mt-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" />
      </div>
      <Button>{type === 'logIn' ? 'Log in' : 'Sign up'}</Button>
    </form>
  );
}
