export function adaptRoute (controller) {
  return async function (req, res) {
    const request= {
      ...(req.body || {}),
      ...(req.params || {}),
    }
    try {
      const httpResponse = await controller.handle(request)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      }

      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  }
}
