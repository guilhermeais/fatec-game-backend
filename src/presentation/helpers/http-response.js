export function ok(data) {
  return {
    statusCode: 200,
    body: data,
  };
}

export function serverError(error) {
  return {
    statusCode: error.statusCode? error.statusCode : 500,
    body: error,
  };
}