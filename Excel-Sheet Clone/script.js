// excel dimensions and constants
const rows=100;
const columns = 26;
const transparentBlue='#ddddff';
const transparent='transparent';

// excel components
const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const currentCellHeading=document.getElementById('current-cell');

// excel Buttons
const boldBtn = document.getElementById('bold-btn');
const italicsBtn = document.getElementById('italics-btn');
const underlineBtn = document.getElementById('underline-btn');
const leftBtn = document.getElementById('left-btn');
const centerBtn = document.getElementById('center-btn');
const rightBtn = document.getElementById('right-btn');
const cutBtn = document.getElementById('cut-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const uploadInput = document.getElementById('upload-input');

// color inputs
const bgColorSelector=document.getElementById('bgColor');
const fontColorSelector=document.getElementById('fontColor');

// excel dropdowns
const fontFamilyDropdown = document.getElementById('fonte-style-dropdown');
const fontSizeDropdown = document.getElementById('fonte-size-dropdown');

// variables to save cache
let prevCellId;
let cutCell;
let lastPressedBtn;
let matrix = new Array(rows);

for (let row = 0; row < rows; row++) {
    matrix[row] = new Array(columns);
    for (let col = 0; col < columns; col++) {
        matrix[row][col] = {};
    }
}

function colGen(typeOfCell, tableRow, isInnerText, rowNumber) {
    for (let col = 0; col < columns; col++) {
        const cell = document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText = String.fromCharCode(col + 65);
            cell.setAttribute('id',String.fromCharCode(col + 65));
        }
        else{
            // cell.setAttribute('id','testing set ')
            cell.setAttribute('id',`${String.fromCharCode(col + 65)}${rowNumber}`);
            cell.setAttribute('contenteditable','true');
            // key and value
            cell.addEventListener('focus', event => onFocusFunction(event.target));
        }

        // if(cell.typeOf==selectType){
        
        // }
        
        tableRow.append(cell);
    }
}

colGen('th', tHeadRow, true);

for (let row = 1; row <= rows; row++) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.innerText=row;
    th.setAttribute('id',row);
    tr.append(th);
 
    colGen('td',tr,false,row);
    tBody.append(tr);
}

function setCellColor(colId,rowId,color){
    const colHead = document.getElementById(colId);
    const rowHead= document.getElementById(rowId);
    colHead.style.backgroundColor=color;
    rowHead.style.backgroundColor=color;
}

function buttonHighlter(currentCell, button, style, styleProperty) {
    if(currentCell.style[styleProperty]===style){
        button.style.backgroundColor=transparentBlue;
    }
    else{
        button.style.backgroundColor=transparent;
    }
}

function buttonClickHandler(currentCell, button, style, toggleStyle, styleProperty) {
    if (currentCell.style[styleProperty] === style) {
        currentCell.style[styleProperty] = toggleStyle;
        button.style.backgroundColor = transparent;
    }
    else {
        currentCell.style[styleProperty] = style;
        button.style.backgroundColor = transparentBlue;
    }
    updateObjectInMatrix();
}

function onFocusFunction(cell){
    currentCell=cell;
    // 
    if(prevCellId){
        // const colHead = document.getElementById(prevCellId[0]);
        // const rowHead= document.getElementById(prevCellId.substring(1));
        // colHead.style.backgroundColor=transparent;
        // rowHead.style.backgroundColor=transparent;
        setCellColor(prevCellId[0],prevCellId.substring(1),transparent);
    }

    buttonHighlter(currentCell,boldBtn,'bold','fontWeight');

    buttonHighlter(currentCell,italicsBtn,'italic','fontStyle');

    buttonHighlter(currentCell,underlineBtn,'underline','textDecoration');

    currentCellHeading.innerText=cell.id + ' ' + 'selected';
    // const colHead = document.getElementById(cellId[0]);
    // const rowHead=document.getElementById(cellId.substring(1));
    // colHead.style.backgroundColor=transparentBlue;
    // rowHead.style.backgroundColor=transparentBlue;
    setCellColor(cell.id[0],cell.id.substring(1),transparentBlue);
    // here my cellId becomes prev cell id
    prevCellId=cell.id;
}

function updateObjectInMatrix(){
    let id = currentCell.id;
    let tempObj={
        id: id,
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    let col=id[0].charCodeAt(0)-65;
    let row=id.substr(1)-1;
    matrix[row][col]=tempObj;
}

boldBtn.addEventListener('click', () => buttonClickHandler(currentCell, boldBtn, 'bold', 'normal', 'fontWeight'));

italicsBtn.addEventListener('click', () => buttonClickHandler(currentCell, italicsBtn, 'italic', 'normal', 'fontStyle'));

underlineBtn.addEventListener('click', () => buttonClickHandler(currentCell, underlineBtn, 'underline', 'none', 'textDecoration'));

leftBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
    updateObjectInMatrix();
})

rightBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
    updateObjectInMatrix();
})

centerBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='center';
    updateObjectInMatrix();
})

fontFamilyDropdown.addEventListener('change',()=>{
    currentCell.style.fontFamily=fontFamilyDropdown.value;
    updateObjectInMatrix();
})

fontSizeDropdown.addEventListener('change',()=>{
    currentCell.style.fontSize=fontSizeDropdown.value;
    updateObjectInMatrix();
})

// input has better UX and but input is very heavy event Listener
bgColorSelector.addEventListener('input',()=>{
    currentCell.style.backgroundColor=bgColorSelector.value;
    updateObjectInMatrix();
});

fontColorSelector.addEventListener('change',()=>{
    currentCell.style.color=fontColorSelector.value;
    updateObjectInMatrix();
})

cutBtn.addEventListener('click',()=>{
    lastPressedBtn='cut';
    cutCell={
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    currentCell.innerText='';
    currentCell.style.cssText='';
    updateObjectInMatrix();
})

copyBtn.addEventListener('click',()=>{
    lastPressedBtn='copy';
    cutCell={
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
})

pasteBtn.addEventListener('click',()=>{
    currentCell.innerText = cutCell.text;
    currentCell.style = cutCell.style;
     // you can pass
    // cssText to style
    if(lastPressedBtn==='cut'){
        cutCell = undefined;
    }
    updateObjectInMatrix();
})

uploadInput.addEventListener('input',uploadMatrix);

function dowloadMatrix(){
    const matrixString = JSON.stringify(matrix);
    // memory out of my matrixString
    const blob = new Blob([matrixString], { type: 'application/json' });

    // i have my memory which is formed out of matrixString;
    const link = document.createElement('a');
    // convert my blob to link href (URL)
    link.href = URL.createObjectURL(blob);
    link.download='table.json';
    // matrix->stringify->blob->URL
    link.click();
}

function uploadMatrix(event) {
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.readAsText(file); // this is the trigger
        // this reader should convert my blob into js code
        reader.onload = function(event){
            const fileContent = JSON.parse(event.target.result);
            console.log(fileContent);
            // render over table and copy each and every cell
        }
        // reader is inbuild instance of my FileReaderClass
    }
}
