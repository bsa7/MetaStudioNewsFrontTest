export const promiseMiddleware = () => (next: any) => (action: any) => {
  const { promise, types, type, ...rest } = action
  console.log('#3', {
    types,
    type,
    rest,
    action,
  })

  if (!promise && !type && !types) {
    return undefined
  }
  if (!promise && type) {
    return Promise.all([next(action)])
  }
  const [START, SUCCESS, ERROR] = types

  next({ type: START, ...rest })

  return promise.then(
    (result: any) => next({ ...rest, result, type: SUCCESS }),
    (error: any) => next({ ...rest, error, type: ERROR })
  )
}
