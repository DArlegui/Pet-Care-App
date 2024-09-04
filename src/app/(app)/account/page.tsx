import ContentBlock from '@/components/_dashboard/content-block';
import SignOutBtn from '@/components/_dashboard/sign-out-btn';
import H1 from '@/components/_marketing/h1';
import { checkAuth } from '@/lib/server-utils';

export default async function Account() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p className="text-lg">Logged in as {session?.user?.email}</p>
        <p className="text-lg">Session ends in {session?.expires}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
