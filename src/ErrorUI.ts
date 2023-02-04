/**
 * @class ErrorUI
 * @description Surfaces errors to the user.
 * @note Use "span#err" for styling.
 */
export class ErrorUI {
   elem: HTMLSpanElement;
   parent: HTMLElement;
   assignedID?: string;
   type?: string;

   /**
    * @param parent parent DOM element
    * @param type type of DOM element type the error should be, ex. span, h1, p, etc.
    * @param id add an ID for styling
    */
   constructor(parent: HTMLElement, type?: string, id?: string) {
      this.elem = null;
      this.parent = parent;
      this.assignedID = id || null;
      this.type = type || 'span';
   }

   create(text: string) {
      if (this.elem) return;

      this.elem = document.createElement(this.type);
      const newContent = document.createTextNode(String(text));

      this.elem.appendChild(newContent);
      this.parent.parentNode.insertBefore(this.elem, this.parent.nextSibling);

      if (this.assignedID) {
         this.elem.id = this.assignedID;
      }
   }

   remove() {
      if (this.elem) {
         this.elem.parentNode.removeChild(this.elem);
      }

      this.elem = null;
   }
}
