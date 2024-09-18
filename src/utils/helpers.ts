import dayjs from "dayjs"
const listVulgarWord = [
  "đéo",
  "ngu",
  "đốt",
  "vãi",
  "cặc",
  "lồn",
  "buồi",
  "chó",
  "đụ",
  "mẹ mày",
  "bố mày",
  "đéo mẹ",
  "địt",
  "con mẹ nó",
  "đụ mẹ",
  "vcl",
  "vcl đ",
  "đm",
  "dm",
  "cc",
  "cl",
  "vl",
  "vler",
  "vl thật",
  "vl vãi",
  "vãi lồn",
  "đờ mờ",
  "đếch",
  "cmm",
  "vãi đái",
  "đmcl",
  "đkm",
  "ccmm",
  "mmd",
  "vcd",
  "con cặc",
  "thằng chó",
  "thằng ngu",
  "con đĩ",
  "đéo đùa",
  "dái",
  "cứt",
  "fuck",
  "shit",
  "bitch",
]
const listFilter = [
  { name: "Phim bộ", path: "series" },
  { name: "Phim lẻ", path: "single" },
  { name: "Đang diễn ra", path: "ongoing" },
  { name: "Hoàn Thành", path: "completed" },
  { name: "Thuyết Minh", path: "Thuy%E1%BA%BFt%20Minh" },
  { name: "Lồng Tiếng", path: "L%E1%BB%93ng%20Ti%E1%BA%BFng" },
]
export const filterNameMovie = (text: string) => {
  return listFilter.find(({ path }) => path === text)?.name || text
}
// get ID video form URl
export const getIdVideo = (url: string) => {
  const path = url.split("v=")
  const data = path[path.length - 1]
  const findIndex = data.indexOf("&")
  if (findIndex === -1) {
    return data // idVideo
  } else {
    return data.substring(0, findIndex) // idVideo
  }
}
// export function getIdVideo(trailerUrl: string) {
//   const urlParams = new URLSearchParams(new URL(trailerUrl).search);
//   const videoId = urlParams.get('v');
//   return videoId; // Trả về ID của video
// }

//  chuyển đổi ngày giờ và hiện thị các thứ trong tuần
export const formatViToEN = (date: string) => {
  const formatMoment = dayjs(date).format("dddd, DD/MM/YYYY - HH:mm")
  const dateData = formatMoment.split(",")
  // const firstDate = dateData[0];
  const lastDate = dateData[dateData.length - 1]
  // const tableDate = [
  //   { text: 'Monday', renderText: 'Thứ 2' },
  //   { text: 'Tuesday', renderText: 'Thứ 3' },
  //   { text: 'Wednesday', renderText: 'Thứ 4' },
  //   { text: 'Thursday', renderText: 'Thứ 5' },
  //   { text: 'Friday', renderText: 'Thứ 6' },
  //   { text: 'Saturday', renderText: 'Thứ 7' },
  //   { text: 'Sunday', renderText: 'Chủ Nhật' },
  // ];
  // const findDate: any = tableDate.find(({ text }) => text === firstDate);
  return lastDate
}
export const formatDate = (date: string) => {
  const formatMoment = dayjs(date).format("dddd, DD/MM/YYYY - HH:mm")
  const dateData = formatMoment.split(",")
  const firstDate = dateData[0]
  const lastDate = dateData[dateData.length - 1]
  const tableDate = [
    { text: "Monday", renderText: "Thứ 2" },
    { text: "Tuesday", renderText: "Thứ 3" },
    { text: "Wednesday", renderText: "Thứ 4" },
    { text: "Thursday", renderText: "Thứ 5" },
    { text: "Friday", renderText: "Thứ 6" },
    { text: "Saturday", renderText: "Thứ 7" },
    { text: "Sunday", renderText: "Chủ Nhật" },
  ]
  const findDate: any = tableDate.find(({ text }) => text === firstDate)
  return { ...findDate, lastDate: lastDate }
}
export const convertJson = (value: any) => {
  var parsedJSON = JSON?.parse(value)
  return parsedJSON
}

export const checkVulgarWord = (text: string) => {
  const arrayText = text.split(" ")
  const isCheckValue = listVulgarWord.some((item) => arrayText.some((it) => it === item))
  return isCheckValue
}
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount)
}
export const extractNumber = (currencyString: string) => {
  // Remove non-numeric characters except the dot
  const numericString = currencyString.replace(/[^\d.]/g, "")

  // Convert the cleaned string to a number
  const number = parseFloat(numericString.replace(/\./g, ""))

  return number
}
export const formatNumber = (num: number) => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "0"
}
export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
  str = str.replace(/Đ/g, "D")
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, "") // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ")
  str = str.trim()
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ")
  return str
}
export const convertLinkPlayer = ({ link }: { link: string }) => {
  if (link.endsWith(".m3u8")) {
    const pathLink = (link.split("url=").find((item) => item.includes(".m3u8")) as string) || ""
    return { linkPlay: pathLink, type: "video" }
  } else {
    return { linkPlay: link, type: "iframe" }
  }
}
export const formatDuration = (value: number) => {
  const minute = Math.floor(value / 60)
  const secondLeft = value - minute * 60
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
}
