/**
 * makes a html element draggable
 * @param element - element registering drag
 * @param parent - element to be moved
 */
export const dragElement = (elem: HTMLElement, parent: HTMLElement): void => {
   const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
   };

   const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // if parent elem exists, drag this instead of input elem (prevents form input otherwise)
      if (parent) {
         parent.style.top = parent.offsetTop - pos2 + 'px';
         parent.style.left = parent.offsetLeft - pos1 + 'px';
      } else {
         elem.style.top = elem.offsetTop - pos2 + 'px';
         elem.style.left = elem.offsetLeft - pos1 + 'px';
      }
   };

   const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
   };

   let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
   if (document.getElementById(elem.id + 'header')) {
      document.getElementById(elem.id + 'header').onmousedown = dragMouseDown;
   } else {
      elem.onmousedown = dragMouseDown;
   }
};
