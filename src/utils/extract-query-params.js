export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((queryParamsm, param) => {
      const [key, value] = param.split('=')

      queryParamsm[key] = value

      return queryParamsm
    }, {})
}
