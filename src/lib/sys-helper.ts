export const traceError = ({ error = new Error(), message = undefined }) => {
  console.error(message, error)
  console.trace()
}

export const getPropInSafe = <O, T>(object: O, getter: (x: O) => T, replacer: T = undefined): T => {
  try {
    const value = getter(object);

    return typeof value !== 'undefined' ? value : replacer;
  } catch (err) {
    return replacer;
  }
}
