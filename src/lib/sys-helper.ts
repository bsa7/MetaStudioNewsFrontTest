export const traceError = ({ error = new Error(), message = undefined }) => {
  console.error(message, error)
  console.trace()
}
