export const contentType = (req, res, next) => {
  res.type('application/json')
  next()
}
