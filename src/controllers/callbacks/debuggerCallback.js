export function debuggerCallback (event) {
  event.stopImmediatePropagation()
  const { status, ...data } = event.data
  console.group('RSP WORKER DEBUGGING MESSAGE')
  Object.keys(data).forEach(key => console.log(key, data[key]))
  console.groupEnd('RSP WORKER DEBUGGING MESSAGE')
}
