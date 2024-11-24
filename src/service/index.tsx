import { category, categoryHome, country, typeMovies, years } from "@/utils/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import dayjs from "dayjs"
const BASE_API = process.env.NEXT_PUBLIC_BASE_API

export const getDetailMovie = createAsyncThunk("detail", async ({ slug }: { slug: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/phim/${slug}`)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return null
  }
})

export const getBanner = createAsyncThunk("banner", async (page: number) => {
  try {
    const response = await axios.get(`${BASE_API}/danh-sach/phim-moi-cap-nhat`, {
      params: {
        page: page,
      },
    })
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return []
  }
})
export const getCategoryItem = async ({ page, slug }: { page: number; slug: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/v1/api/${slug === "hoat-hinh" ? "danh-sach" : "the-loai"}/${slug}`, {
      params: {
        page: page,
        limit: 24,
        year: dayjs().year(),
      },
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return []
  }
}
export const getAllHomeCategory = createAsyncThunk("category", async () => {
  try {
    const response = await Promise.all(categoryHome.map((item: any) => getCategoryItem({ page: 1, slug: item })))
    return response
  } catch (error) {
    return []
  }
})
export const getMoviesList = async ({ page, slug }: { page: number; slug: string }) => {
  // const pathMovie = typeMovies.includes(slug) ? "danh-sach" : "the-loai"
  const findPathApi = (): string => {
    if (typeMovies.includes(slug)) return "danh-sach"
    if (category.some(cate => cate.path.includes(slug))) return "the-loai"
    if (country.some((nation =>nation.path.includes(slug)))) return "quoc-gia"
    if (years.some((year => String(year.path).includes(slug)))) return "nam"
    return ''
  }
  try {
    const response = await axios.get(`${BASE_API}/v1/api/${findPathApi()}/${slug}`, {
      params: {
        // [type]: slug,
        page: page,
        limit: 24,
        // year: year === 0 ? dayjs().year() : year,
      },
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return []
  }
}

export const getMoviesRelate = createAsyncThunk("relate", async ({ status, country }: { status: string; country: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/v1/api/quoc-gia/${country}`, {
      params: {
        limit: 24,
        status,
        // country,
      },
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return []
  }
})

export const getSearchMovies = createAsyncThunk("search", async ({ keyWord, page }: { keyWord: string; page: number }) => {
  try {
    const response = await axios.get(`${BASE_API}/v1/api/tim-kiem`, {
      params: {
        limit: 24,
        page: page,
        keyword: keyWord,
      },
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error("Data not found!")
    }
  } catch (error) {
    return []
  }
})
