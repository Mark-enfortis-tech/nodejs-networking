'use strict'
const server = require('net').createServer(connection => {
    console.log('Subscriber connected.');

    // two message chunks that together make a whole message
    const firstChunk = '{"type": "changed", "timesta'
    const secondChunk = 'mp": 145065945987}'
})

