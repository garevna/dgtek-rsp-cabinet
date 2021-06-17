export function debuggerCallback (data) {
  event.stopImmediatePropagation()
  console.log('RSP WORKER DEBUGGING MESSAGE:\n', event.data)
}
