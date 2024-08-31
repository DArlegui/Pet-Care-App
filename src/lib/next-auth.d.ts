import { JWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT {
    userId: string;
  }
}
