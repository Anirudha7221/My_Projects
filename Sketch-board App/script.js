let toolsCont = document.querySelector('.tools-cont');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let sticky = document.querySelector('.sticky');
let pencilToolsCont = document.querySelector('.pencil-tools-cont');
let eraserToolsCont = document.querySelector('.eraser-tools-cont');

// conditional varaibles
let isPencilOpen = false;
let isEraserOpen = false;

pencil.addEventListener('click', () => {
    isPencilOpen = !isPencilOpen;
    if (isPencilOpen) {
        pencilToolsCont.style.display = 'block';
        eraserToolsCont.style.display = 'none';
        isEraserOpen = false;
    }
    else {
        pencilToolsCont.style.display = 'none';
    }
})

eraser.addEventListener('click', () => {
    isEraserOpen = !isEraserOpen;
    if (isEraserOpen) {
        eraserToolsCont.style.display = 'block';
        pencilToolsCont.style.display = 'none';
        isPencilOpen = false;
    }
    else {
        eraserToolsCont.style.display = 'none';
    }
})

sticky.addEventListener('click', () => {
    const stickyElement = `<div class="header-cont">

            <div class="minimize"> - </div>
            <div class="remove"> X </div>
        </div>
        <div class="notes-cont">
            <textarea></textarea>
        </div>`;
    const stickyCont=document.createElement('div');
    stickyCont.setAttribute('class','sticky-cont');
    stickyCont.innerHTML=stickyElement;
    document.body.appendChild(stickyCont);
    let minimize=stickyCont.querySelector('.minimize');
    let remove=stickyCont.querySelector('.remove');
    remove.addEventListener('click',()=>{
        stickyCont.remove();
    })
    minimize.addEventListener('click',()=>{
        console.log('testing');
        let notesCont=stickyCont.querySelector('.notes-cont');
        if(notesCont.style.display==='none') notesCont.style.display='block';
        else notesCont.style.display='none';
    })

    stickyCont.onmousedown = function(event) {
        // needs to be discussed
        let shiftX= event.clientX-stickyCont.getBoundingClientRect().left;
        let shiftY= event.clientY-stickyCont.getBoundingClientRect().top;
        // (1) prepare to moving: make absolute and on top by z-index
        stickyCont.style.position = 'absolute';
        stickyCont.style.zIndex = 1000;

        function moveAt(pageX, pageY) {
            stickyCont.style.left = pageX -shiftX + 'px';
            stickyCont.style.top = pageY - shiftY + 'px';
        }

         // move our absolutely positioned ball under the pointer
         moveAt(event.pageX, event.pageY);

         function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
          }
        
          // (2) move the ball on mousemove
          document.addEventListener('mousemove', onMouseMove);
        
          // (3) drop the ball, remove unneeded handlers
          stickyCont.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            stickyCont.onmouseup = null;
          };
        
        };
  
        stickyCont.dragstart=function(){
          return false;
        }
  })