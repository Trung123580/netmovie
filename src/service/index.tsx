import { categoryHome } from "@/utils/constants"
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
    const response = await axios.get(`${BASE_API}/danh-sach`, {
      params: {
        category: slug,
        page: page,
        limit: 24,
        year: dayjs().year(),
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
}
export const getAllHomeCategory = createAsyncThunk("category", async () => {
  try {
    const response = await Promise.all(categoryHome.map((item: any) => getCategoryItem({ page: 1, slug: item })))
    return response
  } catch (error) {
    return []
  }
})
export const getMoviesList = async ({ page, slug, type, year }: { year?: number; type: string; page: number; slug: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/danh-sach`, {
      params: {
        [type]: slug,
        page: page,
        limit: 24,
        year: year === 0 ? dayjs().year() : year,
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
}

export const getMoviesRelate = createAsyncThunk("relate", async ({ status, country }: { status: string; country: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/danh-sach`, {
      params: {
        limit: 24,
        status,
        country,
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

export const getSearchMovies = createAsyncThunk("search", async ({ keyWord, page }: { keyWord: string; page: number }) => {
  try {
    const response = await axios.get(`${BASE_API}/danh-sach`, {
      params: {
        limit: 24,
        page: page,
        search: keyWord,
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
