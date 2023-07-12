/**
 * [objectToQueryString function that build query string from object]
 * @param  {Object} params [object]
 * @return {String}      [query string]
 */

function objectToQueryString(params) {
  if (!params) {
    return "";
  }

  const query = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      query.set(key, `${params[key]}`);
    }
  }

  return query.toString();
}


export default objectToQueryString;
