const BLOB_TYPE = 'image/svg+xml;charset=utf-8';
const SVG_NS = 'http://www.w3.org/2000/svg';

// Download SVG as a file
export const save = (svgEl: SVGSVGElement, name: string): void => {
   svgEl.setAttribute('xmlns', SVG_NS);

   const svgData = svgEl.outerHTML;
   const preface = '<?xml version="1.0" standalone="no"?>\r\n';
   const svgBlob = new Blob([preface, svgData], {
      type: BLOB_TYPE,
   });

   const svgUrl = URL.createObjectURL(svgBlob);
   const downloadLink = document.createElement('a');

   downloadLink.href = svgUrl;
   downloadLink.download = name;

   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);
};
