// the-loai/[slug]/page.tsx
import Category from '@/components/Category';
import { getCategoryItem } from '@/service';
const Page = async ({ params, searchParams}: {searchParams : { page : string}, params: { slug: string } }) => {
  const { slug } = params
  const { page } = searchParams
  console.log(page);
  
  // const loadData = async () => {
  //   try {
  //     const result = await new Promise<boolean>((resolve) => {
  //       setTimeout(() => {
  //         resolve(true);
  //       }, 5000);
  //     });
  //     return result;
  //   } catch (error) {
  //     console.error('Error loading data:', error);
  //   }
  // };
  const convertPageNumber = page ? Number(page) : 1
  const response = await getCategoryItem({ page: convertPageNumber, slug: slug })
  return <Category slug={slug} dataDefault={response} page={convertPageNumber} />;
};

export default Page;
