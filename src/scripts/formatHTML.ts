export default function formatHTML(html: string){
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};