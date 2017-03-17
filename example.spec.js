const nanos = require('nanos')
const app = nanos()

class HelloService {

    constructor(greeter) {
        this.greeter = greeter
    }

    hello(name) {
        return Promise.resolve()
            .then(() => `${this.greeter} ${name}`)
    }
}

app.use(nanos.Auth('secret-shhhhhhhh'));
app.add('hello', () => new HelloService('Hello'))

// server
app.get('hello')
    .then((service) => service.hello('slava'))
    .then((message) => require('assert').equal('Hello slava', message))

app.listen(3000)
    .then(() => console.log('3000 started'))
    .catch((err) => console.log(err, err.stack))

// client
nanos.Service('http://localhost:3000')
    .use(nanos.ClientAuth('token'))
    .get('hello')
    .then((service) => service.hello('slava'))
    .then((message) => require('assert').equal('Hello slava', message))
