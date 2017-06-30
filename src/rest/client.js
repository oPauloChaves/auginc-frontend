import { queryParameters, fetchJson } from 'admin-on-rest/lib/util/fetch';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'admin-on-rest/lib/rest/types';

/**
 * Maps admin-on-rest queries to a powered REST API
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=field,asc&page=0&size=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/list/ids?123,456,789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...params.filter,
          sort: `${field},${order}`,
          page: page - 1,
          size: perPage
        };
        url = `${apiUrl}/${resource}?${queryParameters(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY_REFERENCE: {
        // TODO : use a list of ids
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...params.filter,
          [params.target]: params.id,
          sort: `${field},${order}`,
          page: page - 1,
          size: perPage
        };
        url = `${apiUrl}/${resource}?${queryParameters(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
      case GET_LIST:
        if (!json.totalElements) {
          throw new Error("totalElements is missing in the body response");
        }
        return {
          data: json.content,
          total: json.totalElements
        }
      case GET_MANY_REFERENCE:
        return {
          data: json,
          total: json.length,
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
    // if (type === GET_MANY) {
    //   return Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`)))
    //     .then(responses => ({ data: responses.map(response => response.json) }));
    // }
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options)
      .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };
};
