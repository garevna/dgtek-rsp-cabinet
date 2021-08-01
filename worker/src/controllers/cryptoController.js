import { init } from '../helpers/crypto'

class CryptoController {
  init (request) {
    self.postMessage(init(request.data))
  }
}

export const cryptoController = new CryptoController()
