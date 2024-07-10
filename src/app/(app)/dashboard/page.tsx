import Branding from '@/components/_dashboard/branding';
import ContentBlock from '@/components/_dashboard/content-block';
import PetDetails from '@/components/_dashboard/pet-details';
import PetList from '@/components/_dashboard/pet-list';
import SearchForm from '@/components/_dashboard/search-form';
import Stats from '@/components/_dashboard/stats';

export default function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div className="grid grid-cols-3 grid-rows-[45px_1fr] gap-4 h-[600px]">
        <div className="row-start-1 row-span-1 col-start-1 col-span1">
          <SearchForm />
        </div>

        <div className="row-start-2 row-span-full col-start-1 col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="row-start-1 row-span-full col-start-2 col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
