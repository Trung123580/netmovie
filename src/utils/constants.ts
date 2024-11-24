import { v4 as uuid } from "uuid"
import { MdDateRange, MdLocalMovies, RiGlobalLine, RiMovie2Line, FaFacebookSquare, FaGithubSquare, FaTwitterSquare, FaInstagramSquare } from "@/utils/icons"
// export const statusMovie = [
//   { id: uuid(), status: 'ongoing' },
//   { id: uuid(), status: 'completed' },
// ];

export const category: menuCategory = [
  // {
  //   id: "6eefae19-5dfe-416a-b5a4-b9a18edd6de3",
  //   name: "Tình Cảm",
  //   path: "tinh-cam",
  // },
  // {
  //   id: "3e6db317-fa3a-4976-a8d7-0637630df7c6",
  //   name: "Hài Hước",
  //   path: "hai-huoc",
  // },
  // {
  //   id: "b10559fa-cd43-4b4c-9302-551fd427467a",
  //   name: "Chính Kịch",
  //   path: "chinh-kich",
  // },
  // {
  //   id: "1c944160-5713-40cb-ab98-a9a2a8b4aa06",
  //   name: "Phiêu Lưu",
  //   path: "phieu-luu",
  // },
  // {
  //   id: "328f4739-8580-43d6-b704-16a59c9e718d",
  //   name: "Hành Động",
  //   path: "hanh-dong",
  // },
  // {
  //   id: "d77a86f0-7f25-4212-a113-a9f5bbad4998",
  //   name: "Tâm Lý",
  //   path: "tam-ly",
  // },
  // {
  //   id: "09ccc996-b887-4473-9351-8893d15799f5",
  //   name: "Kinh Dị",
  //   path: "kinh-di",
  // },
  // {
  //   id: "0c70b68c-bee7-48f6-b5b9-a9f6f95557ec",
  //   name: "Bí Ẩn",
  //   path: "bi-an",
  // },
  // {
  //   id: "965d5131-7c0c-44e5-88b0-45b7fc38dae6",
  //   name: "Viễn Tưởng",
  //   path: "vien-tuong",
  // },
  // {
  //   id: "72d01122-a3d1-49ec-ac36-0a79196b92f5",
  //   name: "Khoa Học",
  //   path: "khoa-hoc",
  // },
  // {
  //   id: "181bebea-a86d-4117-8f81-646389940354",
  //   name: "Hình Sự",
  //   path: "hinh-su",
  // },
  // {
  //   id: "d8bc7227-83d9-4a65-a4e0-0409c8627683",
  //   name: "Chiến Tranh",
  //   path: "chien-tranh",
  // },
  // {
  //   id: "8aa1ebbf-677c-463b-bc50-56a3a866e1fd",
  //   name: "Cổ Trang",
  //   path: "co-trang",
  // },
  // {
  //   id: "8cd7476b-c713-48d1-8c59-efa674d6fbc2",
  //   name: "Võ Thuật",
  //   path: "vo-thuat",
  // },
  // {
  //   id: "4901acd9-c7fb-4061-aa34-d4e29028a8b2",
  //   name: "Gia Đình",
  //   path: "gia-dinh",
  // },
  // {
  //   id: "2bf3158e-a5fb-4a55-9a68-9d46d351332e",
  //   name: "Anime",
  //   path: "hoat-hinh",
  // },
  // {
  //   id: "1ef3a13b-5fd7-4fbb-8692-3ae4c1542c4f",
  //   name: "Tài Liệu",
  //   path: "tai-lieu",
  // },
  // {
  //   id: "9671634f-7bd3-4785-9417-a327599620e5",
  //   name: "Học Đường",
  //   path: "hoc-duong",
  // },
  // {
  //   id: "34c4e68a-f70c-448e-b75a-4bf55a4a4403",
  //   name: "Âm Nhạc",
  //   path: "am-nhac",
  // },
  // {
  //   id: "c57b03a8-bba3-4518-9248-192755ace503",
  //   name: "Thể Thao",
  //   path: "the-thao",
  // },
  // {
  //   id: "7572b3c4-46dc-4fed-9088-8cd4781ebe4f",
  //   name: "Thần Thoại",
  //   path: "than-thoai",
  // },
  // {
  //   id: "02fd3ef5-57d2-4e80-b427-5fce9abc8517",
  //   name: "Lịch Sử",
  //   path: "lich-su",
  // },
  // {
  //   id: "00c70c34-e22d-4949-8b29-37a116ff12bd",
  //   name: "Phim 18+",
  //   path: "phim-18",
  // },
  // {
  //   id: "b11a00fb-69a0-4d85-b8fb-2ea121f15c58",
  //   name: "Giả Tưởng",
  //   path: "gia-tuong",
  // },
  // {
  //   id: "65b1b74d-cea3-41ed-9a69-8757346f8377",
  //   name: "Gay Cấn",
  //   path: "gay-can",
  // },
  // {
  //   id: "9f9aaa4b-e6ae-4656-9c5b-f20ee164fe05",
  //   name: "Kinh Điển",
  //   path: "kinh-dien",
  // },
  // {
  //   id: "0f32f385-4d7b-4c45-9eeb-e743e4cd666f",
  //   name: "CT Truyền Hình",
  //   path: "chuong-trinh-truyen-hinh",
  // },
  // {
  //   id: "682f0218-fbe2-483a-aad4-f000a5183d03",
  //   name: "Miền Tây",
  //   path: "mien-tay",
  // },
  // {
  //   id: "fdf6c6a3-9693-4b4e-8f09-d5e2e70eee52",
  //   name: "Lãng Mạn",
  //   path: "lang-man",
  // },
  // {
  //   id: "f69e31e2-10db-4dd1-b87b-e64573b4bfbb",
  //   name: "KH Viễn Tưởng",
  //   path: "khoa-hoc-vien-tuong",
  // },
  // {
  //   id: "76420264-49ef-4239-b486-caac2c2aafcf",
  //   name: "Phim Hài",
  //   path: "phim-hai",
  // },
  {
    id: "5060cc424f1d7d870f294cc4cf89d5c4",
    name: "Hành Động",
    path: "hanh-dong",
  },
  {
    id: "f8ec3e9b77c509fdf64f0c387119b916",
    name: "Lịch Sử",
    path: "lich-su",
  },
  {
    id: "34af679d241f8192eea2b57ef6e938a8",
    name: "Cổ Trang",
    path: "co-trang",
  },
  {
    id: "80a0052a8fb20e24d19b33e7ef7ffa10",
    name: "Chiến Tranh",
    path: "chien-tranh",
  },
  {
    id: "fbdb6b1d270002e30ba9f6f2f13e4b71",
    name: "Viễn Tưởng",
    path: "vien-tuong",
  },
  {
    id: "5059e42facecd4605464027b675424b0",
    name: "Kinh Dị",
    path: "kinh-di",
  },

  {
    id: "fba1c1cdc07d74e5b173beb5fa26dccf",
    name: "Bí Ẩn",
    path: "bi-an",
  },
  {
    id: "4b4457a1af8554c282dc8ac41fd7b4a1",
    name: "Phim 18+",
    path: "phim-18",
  },
  {
    id: "46a6df48b64935df845cf8ad4f448d4c",
    name: "Tình Cảm",
    path: "tinh-cam",
  },
  {
    id: "1a18f0d42e4e66060dbf1fd7cb25d11a",
    name: "Tâm Lý",
    path: "tam-ly",
  },
  {
    id: "06cb2c707ea5c7fbf8658d833ec2f0e3",
    name: "Thể Thao",
    path: "the-thao",
  },
  {
    id: "66c78b23908113d478d8d85390a244b4",
    name: "Phiêu Lưu",
    path: "phieu-luu",
  },
  {
    id: "7d1de48a9e7df7efee761d59522d0026",
    name: "Học Đường",
    path: "hoc-duong",
  },
  {
    id: "d72b9939ba77f7d6d1ce88673bd1f18f",
    name: "Hài Hước",
    path: "hai-huoc",
  },
  {
    id: "eb2363d2cccc7aa6aa6ca7bfc8fe14f9",
    name: "Võ Thuật",
    path: "vo-thuat",
  },
  {
    id: "fd190fc8d1698c641aa56bc1ac9738e2",
    name: "Gia Đình",
    path: "gia-dinh",
  },
  {
    id: "c6d78df96182451f1381522172b77a69",
    name: "Âm Nhạc",
    path: "am-nhac",
  },
  {
    id: "7717c71a37aeee4654db725f93fa11ff",
    name: "Tài Liệu",
    path: "tai-lieu",
  },
  {
    id: "d111447ee87ec1a46a31182ce4623662",
    name: "Miền Tây",
    path: "mien-tay",
  },
  {
    id: "cfaa2e22bb555672e3f2b1b3e2084ac6",
    name: "Khoa Học",
    path: "khoa-hoc",
  },
  {
    id: "0fcf63d85bf8ff2319725225a72579d5",
    name: "Thần Thoại",
    path: "than-thoai",
  },
  {
    id: "2b1db3509d24deb92dff04427c3b8c02",
    name: "Chính Kịch",
    path: "chinh-kich",
  },
  {
    id: "6ef24f2b0d88d6f32b79bbc9fe938b11",
    name: "Kinh Điển",
    path: "kinh-dien",
  },
  {
    id: "0c853f6238e0997ee318b646bb1978bc",
    name: "Trẻ Em",
    path: "tre-em",
  },
  {
    id: "35f2b21717ff9e6e817a5ffcbf03bee2",
    name: "Hình Sự",
    path: "hinh-su",
  },
]
export const country = [
  {
    id: "f6ce1ae8b39af9d38d653b8a0890adb8",
    name: "Việt Nam",
    path: "viet-nam",
  },
  {
    id: "92aa3c93de523a414a520399bb6a4304",
    name: "Trung Quốc",
    path: "trung-quoc",
  },
  {
    id: "2975bbecb6017f4b4f06951f76d858de",
    name: "Thái Lan",
    path: "thai-lan",
  },
  {
    id: "a0cd53c9875b96640ac264ca81996f9f",
    name: "Hồng Kông",
    path: "hong-kong",
  },
  {
    id: "af6c20a40538d2008ca3ad0bae2ddea7",
    name: "Pháp",
    path: "phap",
  },
  {
    id: "24efe2fae513e7066e4a812019b64a66",
    name: "Đức",
    path: "duc",
  },
  {
    id: "14da7029b3324f5c04debb3f687e3d49",
    name: "Hà Lan",
    path: "ha-lan",
  },
  {
    id: "8dbb07a18d46f63d8b3c8994d5ccc351",
    name: "Mexico",
    path: "mexico",
  },
  {
    id: "3d2e31a8a43a2f5822a1e83b4fd22ed5",
    name: "Thụy Điển",
    path: "thuy-dien",
  },
  {
    id: "77dab2f81a6c8c9136efba7ab2c4c0f2",
    name: "Philippines",
    path: "philippines",
  },
  {
    id: "da63256637bc200891fe4e5611309052",
    name: "Đan Mạch",
    path: "dan-mach",
  },
  {
    id: "43310be428ad436c18bab53ee81a1f19",
    name: "Thụy Sĩ",
    path: "thuy-si",
  },
  {
    id: "c338f80e38dd2381f8faf9eccb6e6c1c",
    name: "Ukraina",
    path: "ukraina",
  },
  {
    id: "b28b3d249312674db6cc7533cbbc2936",
    name: "Hàn Quốc",
    path: "han-quoc",
  },
  {
    id: "af5c50bf625c1da71838678a5cf37189",
    name: "Âu Mỹ",
    path: "au-my",
  },
  {
    id: "32d2319752dd165daba82f59878c6afb",
    name: "Ấn Độ",
    path: "an-do",
  },
  {
    id: "445d337b5cd5de476f99333df6b0c2a7",
    name: "Canada",
    path: "canada",
  },
  {
    id: "8a40abac202ab3659bb98f71f05458d1",
    name: "Tây Ban Nha",
    path: "tay-ban-nha",
  },
  {
    id: "4647d00cf81f8fb0ab80f753320d0fc9",
    name: "Indonesia",
    path: "indonesia",
  },
  {
    id: "59317f665349487a74856ac3e37b35b5",
    name: "Ba Lan",
    path: "ba-lan",
  },
  {
    id: "3f0e49c46cbde0c7adf5ea04a97ab261",
    name: "Malaysia",
    path: "malaysia",
  },
  {
    id: "56850d238ce31824c4bc21fd9b75b145",
    name: "Bồ Đào Nha",
    path: "bo-dao-nha",
  },
  {
    id: "b6ae56d2d40c99fc293aefe45dcb3b3d",
    name: "UAE",
    path: "uae",
  },
  {
    id: "471cdb11e01cf8fcdafd3ab5cd7b4241",
    name: "Châu Phi",
    path: "chau-phi",
  },
  {
    id: "31546b274c0da003420bd6a21822c48a",
    name: "Ả Rập Xê Út",
    path: "a-rap-xe-ut",
  },
  {
    id: "b8f81b0defa84c5a7ac72bcdbcee8bb8",
    name: "Nhật Bản",
    path: "nhat-ban",
  },
  {
    id: "af5f08b6445ca1def86fdd38cc1dc0b2",
    name: "Đài Loan",
    path: "dai-loan",
  },
  {
    id: "932bbaca386ee0436ad0159117eabae4",
    name: "Anh",
    path: "anh",
  },
  {
    id: "2fe255994986c448c81c6c5b79b7348b",
    name: "Quốc Gia Khác",
    path: "quoc-gia-khac",
  },
  {
    id: "dc655a18ab16bec3fe66b101d71fcb04",
    name: "Thổ Nhĩ Kỳ",
    path: "tho-nhi-ky",
  },
  {
    id: "2dbf49dd0884691f87e44769a3a3a29e",
    name: "Nga",
    path: "nga",
  },
  {
    id: "1e7544b766ada0a3a68a7c3eb171464a",
    name: "Úc",
    path: "uc",
  },
  {
    id: "42537f0fb56e31e20ab9c2305752087d",
    name: "Brazil",
    path: "brazil",
  },
  {
    id: "49e6eb06f8be23e60dad618725b12946",
    name: "Ý",
    path: "y",
  },
  {
    id: "638f494a6d33cf5760f6e95c8beb612a",
    name: "Na Uy",
    path: "na-uy",
  },
  {
    id: "3cf479dac2caaead12dfa36105b1c402",
    name: "Nam Phi",
    path: "nam-phi",
  },

  // //
  // {
  //   id: "5780ff38-c50a-47b0-a903-516f114200db",
  //   name: "Việt Nam",
  //   path: "viet-nam",
  // },
  // {
  //   id: "79da0851-ee9c-4b36-9b90-b33eee3c8b61",
  //   name: "Trung Quốc",
  //   path: "trung-quoc",
  // },
  // {
  //   id: "06a61ca0-b19a-450c-bac1-cb46a75afc91",
  //   name: "Thái Lan",
  //   path: "thai-lan",
  // },
  // {
  //   id: "44bb92f2-b49f-40e6-a7ac-315cf66272c6",
  //   name: "Âu Mỹ",
  //   path: "au-my",
  // },
  // {
  //   id: "6163ebe1-22c6-46f3-9bd3-b3f3d04a23b6",
  //   name: "Hàn Quốc",
  //   path: "han-quoc",
  // },
  // {
  //   id: "9d89e2c4-700b-4717-8a34-cf0cefa01754",
  //   name: "Nhật Bản",
  //   path: "nhat-ban",
  // },
  // {
  //   id: "9fbdc3de-7a69-4f64-ae5f-d730cf73510b",
  //   name: "Đài Loan",
  //   path: "dai-loan",
  // },
  // {
  //   id: "bf3fd6a7-e11d-4193-a0e6-2db4e88ce41a",
  //   name: "Ấn Độ",
  //   path: "an-do",
  // },
  // {
  //   id: "fbcf1666-54e6-4c0f-aa33-20451bb2b358",
  //   name: "Hong Kong",
  //   path: "hong-kong",
  // },
  // {
  //   id: "c4053b1d-ebfa-4949-b546-cbc188c91260",
  //   name: "Singapore",
  //   path: "singapore",
  // },
  // {
  //   id: "72689e4c-d1b5-459b-add0-0c941da195c3",
  //   name: "Anh",
  //   path: "anh",
  // },
  // {
  //   id: "bed00fa5-2c60-4515-889e-5a7e36049689",
  //   name: "Ý",
  //   path: "y",
  // },
  // {
  //   id: "52a2ebeb-9f8e-4034-aaee-ae46e4a19e54",
  //   name: "Tây Ban Nha",
  //   path: "tay-ban-nha",
  // },
  // {
  //   id: "975c84b1-4281-4403-b108-1246886ee60b",
  //   name: "Pháp",
  //   path: "phap",
  // },
  // {
  //   id: "639f73ec-76ca-4414-b630-4ce169717dd5",
  //   name: "Đức",
  //   path: "duc",
  // },
  // {
  //   id: "e340c82e-e903-4acd-8ac8-1d555193f254",
  //   name: "Nga",
  //   path: "nga",
  // },
  // {
  //   id: "576b04f1-23f3-4236-b596-424825e1dc9e",
  //   name: "Hoa Kỳ",
  //   path: "hoa-ky",
  // },
  // {
  //   id: "239fab76-0b93-49b3-89e2-41a793b1f6f0",
  //   name: "Pháp-Đức",
  //   path: "phapduc",
  // },
  // {
  //   id: "93131bcd-f301-4827-8b8f-ba1a7a0ea265",
  //   name: "Thái Lan-Pháp",
  //   path: "thai-lanphap",
  // },
  // {
  //   id: "f4e26cdd-73d7-4e0b-8fc1-5d255d4f0f20",
  //   name: "Hong Kong",
  //   path: "hong-ko",
  // },
]
export const topMovies = [
  { id: uuid(), name: "TV shows", path: "tv-shows" },
  { id: uuid(), name: "Phim lẻ", path: "phim-le" },
  { id: uuid(), name: "Phim bộ", path: "phim-bo" },
  { id: uuid(), name: "Anime", path: "hoat-hinh" },
]
export const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => {
  const year = 2000 + i
  return {
    id: uuid(),
    name: year,
    path: year,
  }
}).sort((a: any, b: any )=> {
  if (a.path < b.path) return 1
  if (a.path > b.path) return -1
  return 0
})
export const navHeader = [
  { id: uuid(), name: "Loại Phim", path: "/loai-phim", category: topMovies, Icon: RiMovie2Line },
  { id: uuid(), name: "Thể loại", path: "/the-loai", category: category, Icon: MdLocalMovies },
  { id: uuid(), name: "quốc gia", path: "/quoc-gia", category: country, Icon: RiGlobalLine },
  { id: uuid(), name: "năm", path: "/year", category: years, Icon: MdDateRange },
]
export const popup: popup = {
  sharePopup: "sharePopup",
  trailerPopup: "trailerPopup",
  packages: "packages",
  info: "info",
  popupYesNo: "popupYesNo",
  logins: "logins",
  search: "search",
}

export const typeToast = {
  error: "error",
  success: "success",
}

export const aboutUs = [
  { id: uuid(), name: "FAQ", path: "" },
  { id: uuid(), name: "TRUNG TÂM TRỢ GIÚP", path: "" },
  { id: uuid(), name: "ĐIỀU KHOẢN", path: "" },
  { id: uuid(), name: "CHÍNH SÁCH", path: "" },
]
export const aboutIcon = [
  { id: uuid(), icon: FaFacebookSquare, path: "https://www.facebook.com/profile.php?id=100030925532732" },
  { id: uuid(), icon: FaGithubSquare, path: "https://github.com/Trung123580" },
  { id: uuid(), icon: FaTwitterSquare, path: "https://x.com/" },
  { id: uuid(), icon: FaInstagramSquare, path: "https://www.instagram.com/vuongvan_trung" },
]

// export const comboList = [
//   {
//     id: uuid(),
//     title: '1 tháng',
//     discountMoney: '200.000',
//     desc: 'Trải nghiệm xem phim không giới hạn trong vòng 1 tháng. Đăng ký ngay để thỏa sức tận hưởng những bộ phim bom tấn và các chương trình yêu thích mà không lo bị gián đoạn.',
//     defaultMoney: '300.000',
//     type: 1,
//   },
//   {
//     id: uuid(),
//     title: '7 tháng',
//     discountMoney: '1.200.000',
//     desc: 'Xem phim thỏa thích trong suốt 7 tháng với mức giá ưu đãi. Gói dịch vụ này mang đến cho bạn cơ hội thưởng thức hàng nghìn bộ phim và chương trình giải trí hấp dẫn mà không phải lo lắng về chi phí.',
//     defaultMoney: '1.700.000',
//     type: 2,
//   },
//   {
//     id: uuid(),
//     title: '1 năm',
//     discountMoney: '2.000.000',
//     desc: 'Đăng ký ngay gói 1 năm để có trải nghiệm giải trí tuyệt vời nhất. Xem phim không giới hạn trong suốt 12 tháng, cùng với nhiều ưu đãi và tính năng đặc biệt chỉ dành riêng cho bạn.',
//     defaultMoney: '3.300.000',
//     type: 3,
//   },
//   {
//     id: uuid(),
//     title: '1 phút',
//     discountMoney: '2.000',
//     desc: 'Thử ngay gói xem phim 1 phút để cảm nhận chất lượng dịch vụ của chúng tôi. Đây là lựa chọn lý tưởng cho những ai muốn trải nghiệm nhanh chóng và tiện lợi.',
//     defaultMoney: '3.000',
//     type: 4,
//   },
// ];

// movie

export const typeStatus = {
  status1: "Tập",
  status2: "Hoàn tất",
}

export const categoryHome = ["hanh-dong", "hoat-hinh", "kinh-di", "vien-tuong"]
export const typeMovies = ["phim-le", "phim-bo", "hoat-hinh", "tv-shows"]
