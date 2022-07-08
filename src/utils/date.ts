import { uppercaseFirstLetter } from "./string"

export const getUSDateFromTimeStamp = (timestamp: number): string => {
  const date = new Date(timestamp)

  return uppercaseFirstLetter(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }))
}