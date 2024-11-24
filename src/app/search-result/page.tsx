import Search from '@/components/Search';
const page = async ({ searchParams }: { searchParams: { query: string, page: number } }) => {
  const { query, page } = searchParams;
  return <Search query={query} page={page ?? 1} />;
};

export default page;
