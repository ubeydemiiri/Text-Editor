window.onload = function() {
const savedContent = localStorage.getItem('editorContent');
if (savedContent) {
    document.getElementById('editor').innerHTML = savedContent;
    bindImageEvents();
}
};

function formatText(command) {
    if (document.queryCommandSupported(command)) {
        document.execCommand(command, false, null);
    } else {
        console.log("The command is not supported by your browser.");
    }
}
function insertList(command) {
    document.execCommand(command, false, null);
}
function insertImage() {
    const url = prompt("Enter image URL:")
    if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.draggable = true;
        img.style.maxWidth ='100%';
        img.style.height = 'auto';
        img.addEventListener('dragstart' , handleDragstart);
        img.addEventListener('dragend' , handleDragEnd);
        document.getElementById('editor').appendChild(img);
    }
}
function saveContent() {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('editorContent' , content);
    alert("content saved!")
}
function downloadContent() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], {type: "text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
}
let draggedImage = null;
function handleDragstart(event) {
    draggedImage = event.target;
    event.dataTrnsfer.setData('text/html', draggedImage.outerHTML);
    draggedImage.style.opacity = '0.5';
}
function handleDragEnd(event) {
draggedImage.style.opacity = '1';
draggedImage = null; 
}
document.getElementById('editor').addEventListener('dragover', function(event){
    event.preventDefault();
});
document.getElementById('editor').addEventListener('drop', function(event){
event.preventDefault();
if (draggedImage) {
    const dropX = event.clientX;
    const dropY = event.clientY;
    draggedImage.style.position = 'absolute';
    draggedImage.style.left = `${dropX - this.offsetLeft}px`;
    draggedImage.style.top = `${dropY - this.offsetTop}px`;
}
});
function bindImageEvents() {
    const images = document.getElementById('editor').querySelectorAll('img');
    images.forEach(img => {
        img.draggable = true;
        img.addEventListener('dragstart', handleDragstart);
        img.addEventListener('dragend', handleDragEnd);
    })
}