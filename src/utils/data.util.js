export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  return [...originalArray] .sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}
