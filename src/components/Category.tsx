'use client';
import { useEffect, useState } from 'react';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/utils/moduleMaterial'
import { category } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '@/store/storeApi';
import { RootState } from '@/store/store';
import Loading from '@/components/Loading';
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
function Category({ slug, dataDefault, page }: {page:number, slug: string, dataDefault: any }) {
  const { isLoading }: {isLoading:boolean} = useSelector((state: RootState) => state.storeApp);
  const [dataNewMovie, setDataNewMovie] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(numberPage.one);
  // const {
    //   currentUser,
    //   handle: { onLoading, onToggleMovie },
    //   headerData: { category },
    // }: any = useApp();
    const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchPage: number | null = Number(searchParams.get('page') ?? numberPage.one);
  const categoryName = category.find((item: any) => item.path === slug)?.name;
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: 'smooth' });
  };
  useEffect(() => {
    if(!dataDefault) return
    (async () => {
      dispatch(setIsLoading(false))
      setDataNewMovie(dataDefault?.items)
      setTotalPages(Number(dataDefault?.pagination.totalPages));
      handleScrollToTop();
    })();
  }, [searchPage, slug, dataDefault?.items.length, page]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setIsLoading(true))
    router.push(`${pathName}?page=${value}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  if (!dataNewMovie.length) return null;
  return (
    <div className='container'>
      <TitlePath title={categoryName ?? ''} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {dataNewMovie.map((movie: any) => (
          <CardProduct
            key={movie._id}
            data={movie}
            // onToggleMovie={() => onToggleMovie(movie)}
            // findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
          />
        ))}
      </div>
      <div className='my-10 flex justify-end'>
        <Pagination count={totalPages} page={page} onChange={handleChange} shape="rounded" color='primary' variant="outlined" />
      </div>
    </div>
  );
}

export default Category;
