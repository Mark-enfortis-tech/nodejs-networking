'use strict'
const server = require('net').createServer(connection => {
    console.log('Subscriber connected.');

    // two message chunks that together make a whole message
    const firstChunk = '{"type": "changed", "timesta';
    const secondChunk = 'mp": 145065945987}\n';

    // send the first chunk immediately
    connection.write(firstChunk);
    console.log('sent firstChunk');


    //after a short delay send the second chunk
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        console.log('sent secondChunk');
        connection.end();
    },100);

    //clear timer when the connection ends
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected');
    });
});

server.listen(60300, function() {
    console.log('Test server listening for subscribers...');
});

