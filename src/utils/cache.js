export const setList = (key, value) => {
  const tempList = []
  if (localStorage.getItem(key) != null) {
    const oldList = JSON.parse(localStorage.getItem(key))
    oldList.forEach(item => {
      if (item !== value) {
        tempList.push(item)
      }
    })
  }
  tempList.push(value)
  localStorage.setItem(key, JSON.stringify(tempList))
}

export const getList = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const clearList = (key) => {
  localStorage.removeItem(key)
}
