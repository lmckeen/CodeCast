import { reload, initResponse } from './messages'
import { send, sendString } from './queue'
import { setConnected } from './status'

export class CodeCast {
  #shouldReload

  constructor(shouldReload) {
    const player = new cast.framework.RemotePlayer()
    const controller = new cast.framework.RemotePlayerController(player)
    const events = cast.framework.RemotePlayerEventType
    const context = cast.framework.CastContext.getInstance()

    this.#shouldReload = shouldReload ?? true
    setConnected(player.isConnected ?? false)
    
    controller.addEventListener(events.IS_CONNECTED_CHANGED, (e) => {
      const session = context.getCurrentSession()
      
      setConnected(e.value)
      initResponse(session)

      if (session?.getSessionState() === 'SESSION_RESUMED' && this.#shouldReload) {
        reload()
        setConnected(false)
      }
    })
  }

  send = send
  sendString = sendString
  reload() {
    setConnected(false)
    reload()
  }
}
