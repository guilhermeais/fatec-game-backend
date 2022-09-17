export function ok(data) {
  return {
    statusCode: 200,
    body: data,
  };
}