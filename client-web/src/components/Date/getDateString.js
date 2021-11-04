const date = new Date()
let month = date.getMonth() + 1
let day = date.getDate()
let hour = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours()
let minutes = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()

if (month < 10) month = "0" + month.toString()
if (day < 10) day = "0" + day.toString()
const dateString = `${date.getFullYear().toString()}.${month}.${day}  ${hour}:${minutes}`

export const getDateString = () => {
    return dateString
}
export const getYear = () => date.getFullYear()
export const getMonthIndex = () => date.getMonth()
export const getMonth = () => month
export const getDate = () => day
export const getHours = () => hour
export const getMinutes = () => minutes