export function debuggerCallback (data) {
  event.stopImmediatePropagation()
  console.group('RSP WORKER DEBUGGING MESSAGE')
  Object.keys(event.data).forEach(key => console.log(key, data[key]))
  console.log('RSP WORKER DEBUGGING MESSAGE:\n', event.data)
  console.groupEnd('RSP WORKER DEBUGGING MESSAGE')
}
