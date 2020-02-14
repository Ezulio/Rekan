const ipc = require('electron').ipcRenderer;

const printpdfbutton  = document.getElementById('print-pdf');

printpdfbutton.addEventListener('click', function(event){
    ipc.send('print-to-pdf');
});

ipc.on('wrote-pdf', function(event, path){
    const message = `wrote PDF to : ${path}`;
    document.getElementById('pdf-path').innerHTML = message;
});