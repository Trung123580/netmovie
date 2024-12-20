const DetailsDynamic = dynamic(() => import("@/components/Details"))
const Loading = dynamic(() => import("@/components/Loading"))
import dynamic from "next/dynamic"
import { Suspense } from "react"
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  return (
    <Suspense fallback={<Loading />}>
      <DetailsDynamic slug={slug} />
    </Suspense>
  )
}

export default page
