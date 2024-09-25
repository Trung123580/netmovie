import Search from '@/components/Search';
// import { removeVietnameseTones } from '@/utils/helpers';
const page = async ({ searchParams }: { searchParams: { query: string, page: number } }) => {
  const { query, page } = searchParams;
  // const convertValue = removeVietnameseTones(query);
  return <Search query={query} page={page ?? 1} />;
};

export default page;
