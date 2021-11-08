/**
 * download svg file
 * @param {SVGSVGElement} svgElem Parent SVG element
 * @param {string} name File name
 * @returns {void}
 */
export const save = (svgEl: SVGSVGElement, name: string): void => {
   svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

   const svgData = svgEl.outerHTML;
   const preface = '<?xml version="1.0" standalone="no"?>\r\n';
   const svgBlob = new Blob([preface, svgData], {
      type: 'image/svg+xml;charset=utf-8',
   });

   const svgUrl = URL.createObjectURL(svgBlob);
   const downloadLink = document.createElement('a');

   downloadLink.href = svgUrl;
   downloadLink.download = name;

   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);
};
