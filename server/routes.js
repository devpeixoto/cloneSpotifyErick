import config from "./config.js"
import { Controller } from "./controller.js"
import { logger } from "./util.js"
const {
    location,
    pages: {
        homeHTML,
        controllerHTML
    }
} = config
const controller = new Controller()
async function routes(request, response) {
    const { method, url } = request

    if (method === 'GET' && url === '/') {
        response.writeHead(302, {
            'Location': location.home
        })
        return response.end()
    }
    if (method === 'GET' && url === '/home') {
        const {
            stream, type
        } = await controller.getFileStream(controllerHTML)
        //PADRÃO DO RESPONSE é text/html
        // response.writeHead(200, {
        //     'content-Type': 'text/html'
        // })
        return stream.pipe(response)
    }
    if (method === 'GET' && url === '/controller') {
        const {
            stream
        } = await controller.getFileStream(controllerHTML)
        //PADRÃO DO RESPONSE é text/html
        // response.writeHead(200, {
        //     'content-Type': 'text/html'
        // })
        return stream.pipe(response)
    }
    if (method === 'GET') {
        return
    }
    response.writeHead(404)
    return response.end()
}


export function handler(request, response) {
    return routes(request, response)
        .catch(error => logger.error(`Deu ruim: ${error.stack}`))
}