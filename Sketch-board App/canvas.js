let canvas= document.querySelector('canvas');
let pencilWidth=document.querySelector('.pencil-width');
let eraserWidth=document.querySelector('.eraser-width');
let download=document.querySelector('.download');
let upload=document.querySelector('.upload');
let black=document.querySelector('.black');
let red=document.querySelector('.red');
let blue=document.querySelector('.blue');

let undo=document.querySelector('.undo');
let redo=document.querySelector('.redo');

let undoRedoCache=[canvas.toDataURL()];
let currentUrlIndex = 0;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let penTools=canvas.getContext('2d');

penTools.strokeStyle="blue";
penTools.lineWidth=3;


pencilWidth.addEventListener('input',()=>{
    penTools.lineWidth=pencilWidth.value;
})

pencil.addEventListener('click',()=>{
    isPencilOpen=true;
    isEraserOpen=false;
    penTools.strokeStyle="blue";
    penTools.lineWidth=3;
    pencilWidth.value=3;
})

black.addEventListener('click',()=>{
    penTools.strokeStyle="black";
})

red.addEventListener('click',()=>{
    penTools.strokeStyle="red";
})

blue.addEventListener('click',()=>{
    penTools.strokeStyle="blue";
})

eraserWidth.addEventListener('input',()=>{
    penTools.lineWidth=eraserWidth.value;
})

eraser.addEventListener('click',()=>{
    isPencilOpen=false;
    isEraserOpen=true;
    penTools.strokeStyle="white";
})

let isMouseDown = false;
canvas.addEventListener('mousedown', (event) => {
    isMouseDown=true;
    penTools.beginPath();
    // clientX is mouse x coordinate of your mousedown event
    let x = event.clientX+3;
    let y = event.clientY-100;
    penTools.moveTo(x, y);
})

canvas.addEventListener('mousemove',(e)=>{
    if(isMouseDown){
        penTools.lineTo(e.clientX+3, e.clientY-100);
        penTools.stroke();
    }
})

canvas.addEventListener('mouseup',(e)=>{
    isMouseDown=false
    // converted my canvas to URL
    let url = canvas.toDataURL();
    undoRedoCache.push(url);
    currentUrlIndex=undoRedoCache.length-1;
})

undo.addEventListener('click', () => {
    if (currentUrlIndex > 0) {
        currentUrlIndex--;
    }
    renderURLonCanvas(undoRedoCache[currentUrlIndex]);
})

redo.addEventListener('click', () => {
    if (currentUrlIndex < undoRedoCache.length - 1) {
        currentUrlIndex++;
    }
    renderURLonCanvas(undoRedoCache[currentUrlIndex]);
})

function renderURLonCanvas(url){
    let img = new Image;
    console.log(url);
    img.src = url;
    img.onload = () => {
        penTools.clearRect(0, 0, canvas.width, canvas.height);
        penTools.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

download.addEventListener('click',()=>{
    const url = canvas.toDataURL();
    let a = document.createElement('a');
    a.href=url;
    a.download="canvas.jpg";
    a.click();
});

upload.addEventListener('click',()=>{
    let inputFile=document.createElement('input');
    inputFile.setAttribute('type','file');
    // it acts as clicked
    inputFile.click();

    inputFile.addEventListener('change',(event)=>{
        let file = inputFile.files[0];
        let url = URL.createObjectURL(file);
        renderURLonCanvas(url);
    })
})