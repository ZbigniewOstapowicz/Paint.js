const canvas1= document.querySelector('[data-js="canvas1"]');
const canvas2= document.querySelector('[data-js="canvas2"]');
const ctx1=canvas1.getContext('2d');
const ctx2=canvas2.getContext('2d');
const content= document.querySelector('[data-js="content"]');
const contentSize=getComputedStyle(content);
canvas1.width=parseInt(contentSize.getPropertyValue('width'));
canvas1.height=parseInt(contentSize.getPropertyValue('height'));
canvas2.width=parseInt(contentSize.getPropertyValue('width'));
canvas2.height=parseInt(contentSize.getPropertyValue('height'));
console.log(canvas2.width, canvas2.height);


