import Logo from '@/components/_root/logo';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
