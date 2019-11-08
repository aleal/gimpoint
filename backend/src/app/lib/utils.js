import Youch from 'youch';
/**
 * Checks if param func is a function.
 * @param {*} func function to be checked
 */
export function isFunction(func) {
  return typeof func === 'function';
}

export async function extractError(err, req) {
  const details = await new Youch(err, req).toJSON();
  const { name, message } = details.error;
  const error = name === 'BusinessError' ? message : 'Internal server error';
  if (process.env.NODE_ENV === 'development') {
    return { error, details };
  }
  return { error };
}
