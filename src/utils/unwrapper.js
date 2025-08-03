export const unwrap = promise => promise.then(res => res.data.metadata)
export const unwrapAll = promise => promise.then(res => res.data)