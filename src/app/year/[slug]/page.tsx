import Year from "@/components/Year";
import { getMoviesList } from "@/service"
const Page = async ({ params, searchParams }: { searchParams: { page: string; year: string }; params: { slug: string } }) => {
  const { slug } = params
  const { page } = searchParams
  const convertPageNumber = page ? Number(page) : 1
  // const convertYear = year ? Number(year) : 0
  const response = await getMoviesList({ page: convertPageNumber, slug: slug, })
  return <Year slug={slug} dataDefault={response} page={convertPageNumber} />
}

export default Page
