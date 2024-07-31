import { v4 as uuid } from 'uuid';
import {
  FaRankingStar,
  MdLocalMovies,
  RiGlobalLine,
  RiMovie2Line,
  FaFacebookSquare,
  FaGithubSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from '@/utils/icons';
// export const statusMovie = [
//   { id: uuid(), status: 'ongoing' },
//   { id: uuid(), status: 'completed' },
// ];

export const category : menuCategory = [
  { id: uuid(), name: 'Hành Động', path: 'hanh-dong' },
  { id: uuid(), name: 'Phiêu Lưu', path: 'phieu-luu' },
  { id: uuid(), name: 'Hoạt Hình', path: 'hoat-hinh' },
  { id: uuid(), name: 'Hài', path: 'hai' },
  { id: uuid(), name: 'Hình Sự', path: 'hinh-su' },
  { id: uuid(), name: 'Tài Liệu', path: 'tai-lieu' },
  { id: uuid(), name: 'Chính Kịch', path: 'chinh-kich' },
  { id: uuid(), name: 'Gia Đình', path: 'gia-dinh' },
  { id: uuid(), name: 'Giả Tưởng', path: 'gia-tuong' },
  { id: uuid(), name: 'Lịch Sử', path: 'lich-su' },
  { id: uuid(), name: 'Kinh Dị', path: 'kinh-di' },
  { id: uuid(), name: 'Nhạc', path: 'nhac' },
  { id: uuid(), name: 'Bí Ẩn', path: 'bi-an' },
  { id: uuid(), name: 'Lãng Mạn', path: 'lang-man' },
  { id: uuid(), name: 'Viễn Tưởng', path: 'khoa-hoc-vien-tuong' },
  { id: uuid(), name: 'Gây Cấn', path: 'gay-can' },
  { id: uuid(), name: 'Tâm Lý', path: 'tam-ly' },
  { id: uuid(), name: 'Tình Cảm', path: 'tinh-cam' },
  { id: uuid(), name: 'Cổ Trang', path: 'co-trang' },
  { id: uuid(), name: 'Miền Tây', path: 'mien-tay' },
  { id: uuid(), name: 'Phim 18 +', path: 'phim-18' },
];
const region = [
  // { id: uuid(), name: 'TV shows', path: 'tv-shows' },
];
const topMovies = [
  { id: uuid(), name: 'TV shows', path: 'tv-shows' },
  { id: uuid(), name: 'Phim lẻ', path: 'phim-le' },
  { id: uuid(), name: 'Phim bộ', path: 'phim-bo' },
  { id: uuid(), name: 'Đang chiếu', path: 'phim-dang-chieu' },
];
export const navHeader = [
  { id: uuid(), name: 'Loại Phim', path: '/loai-phim', category: topMovies, Icon: RiMovie2Line },
  { id: uuid(), name: 'Thể loại', path: '/the-loai', category: category, Icon: MdLocalMovies },
  { id: uuid(), name: 'quốc gia', path: '/quoc-gia', category: [], Icon: RiGlobalLine },
  { id: uuid(), name: 'top phim', path: '/top-phim', category: [], Icon: FaRankingStar },
];
export const popup: popup = {
  sharePopup: 'sharePopup',
  trailerPopup: 'trailerPopup',
  packages: 'packages',
  info: 'info',
  popupYesNo: 'popupYesNo',
  logins: 'logins',
  search: 'search',
};

export const typeToast = {
  error: 'error',
  success: 'success',
};

export const aboutUs = [
  { id: uuid(), name: 'FAQ', path: '' },
  { id: uuid(), name: 'TRUNG TÂM TRỢ GIÚP', path: '' },
  { id: uuid(), name: 'ĐIỀU KHOẢN', path: '' },
  { id: uuid(), name: 'CHÍNH SÁCH', path: '' },
];
export const aboutIcon = [
  { id: uuid(), icon: FaFacebookSquare, path: 'https://www.facebook.com/' },
  { id: uuid(), icon: FaGithubSquare, path: 'https://github.com/' },
  { id: uuid(), icon: FaTwitterSquare, path: 'https://x.com/' },
  { id: uuid(), icon: FaInstagramSquare, path: 'https://www.instagram.com/' },
];

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
  status1: 'Tập',
  status2: 'Hoàn tất',
};

export const categoryHome = ['hanh-dong', 'hoat-hinh', 'kinh-di', 'vien-tuong']