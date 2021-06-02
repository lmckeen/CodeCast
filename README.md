# CodeCast

Allows local code to be easily casted to a chromecast receiver with hot reloading support

<br>

## How to use CodeCast

<br>

```
npm install codecast
```

<br>

### Sender 
```js
import { CodeCast } from 'codecast/sender'

window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    const codeCast = new CodeCast()
    const code = 'resolve(navigator.userAgent)'

    codeCast.sendString(code).then(userAgent => {
      console.log(userAgent)
    })
  }
}
```

<br>

### Receiver
```js
import { CodeCast } from 'codecast/receiver'

const codeCast = new CodeCast()

codeCast.start({
  disableIdleTimeout: true
})
```
<br>

## API Docs

<br>

### Sender

```js
//Request URL contents and send it to the receiver as JS code to be run
send(url: string): Promise

//Send text to the receiver as JS code to be run
sendString(text: string): Promise

//Send a message to the receiver telling it to reload
reload(): void
```

<br>

### Receiver

```js
//Proxy for the CastReceiverContext start function 
start(options: CastReceiverOptions): CastReceiverContext
```

<br>

## Demo

<br>

### Live 
https://lukemckeen.com/CodeCast-Demo/dist/sender

<br>

### Repo
https://github.com/lmckeen/CodeCast-Demo
