const actionNamesArray = [
  'FETCH_USER',
  'LOGIN_USER',
  'REGISTER_USER',
]

type ValuesOf<T extends any[]>= T[number]

type ActionNameKey = {
  [key in ValuesOf<typeof actionNamesArray>]: string
}

const hashActionNames = (): ActionNameKey => {
  const result = {} as ActionNameKey
  actionNamesArray.forEach((actionName: string) => result[actionName] = actionName)
  return result
}

export const actionNames = hashActionNames()

const mapActionNames = (): ActionNameKey => {
  const result = {} as ActionNameKey
  actionNamesArray.forEach((actionName: string) => {
    result[`${actionName}__START`] = `${actionName}__START`
    result[`${actionName}__SUCCESS`] = `${actionName}__SUCCESS`
    result[`${actionName}__FAILURE`] = `${actionName}__FAILURE`
  })
  return result
}

export const actionTypes = mapActionNames()
