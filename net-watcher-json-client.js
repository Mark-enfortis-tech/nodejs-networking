'use strict'
const net = require('net');
const client = net.connect({port: 60300});

client.on('data', data => {
    const message = JSON.parse(data);
    if (message.type == 'watching'){
        console.log(`Now watching: ${message.file}`)
    } else if (message.type == 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    } else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
})


net.createServer(connection => {
    // reporting 
    console.log('Subscriber connected');
    connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n' );

    // watcher setup
    const watcher = fs.watch(filename, () => connection.write(
        JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n' ));

    //cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected');
        watcher.close();
    });
}).listen(60300, () => console.log('Listening for subscribers'));