const socket = new WebSocket('ws://localhost:8443/record');
socket.onopen = (e) => {
    console.log('open socket successful')
    socket.send('hello');
};

socket.onmessage = (e) => {
    console.log('receive message');
    console.log('e');
};

