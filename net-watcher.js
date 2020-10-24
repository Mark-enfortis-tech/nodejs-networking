'use strict'
const fs = require('fs');
const { connect } = require('http2');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
    throw Error('Error: No Filename specified');
}

net.createServer(connection => {
    // reporting 
    console.log('Subscriber connected');
    connection.write(`Now watching "${filename}" for changes...\n`);

    // watcher setup
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`));

    //cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected');
        watcher.close();
    });
}).listen(60300, () => console.log('Listening for subscribers'));