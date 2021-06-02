import { initMessages, sendConnected } from "./messages";

export class CodeCast {
  constructor() {
    this.context = cast.framework.CastReceiverContext.getInstance()
    
    initMessages(this.context)
    
    const castPlayer = document.querySelector('cast-media-player')

    castPlayer.style.setProperty('--logo-image', 'linear-gradient(transparent, transparent)');
    castPlayer.style.setProperty('--splash-image', 'linear-gradient(transparent, transparent)');
  }

  start(options) {
    this.context.start(options)
    sendConnected()
    return this.context
  }
}