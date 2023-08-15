let d = document
let $main = document.querySelector('main')

console.log($main)
let obtHTML = (options)=>{
    let {url, succes, error}= options;
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', e=>{
        if(xhr.readyState != 4)return;

        if(xhr.status >= 200 && xhr.status < 300 ){
            let html = xhr.responseText;
            succes(html);

        }else{
            let mess = xhr.statusText || 'Error de conexion';

            error(`Error ${xhr.status}: ${mess}`);
        } 


    })
    xhr.open('GET', url);

    xhr.setRequestHeader('Content-type', 'text/html; charset=utf-8')

    xhr.send()


    d.addEventListener('DOMContentLoaded', e =>{
        obtHTML({
            url:'sitioWebfetch/index2.html',
            succes:(html) => $main.innerHTML =  html,
            error: (err) =>$main.innerHTML = `<h1>${err}</h1>`
        })
    })
    
    d.addEventListener('click', e=>{
        if(e.target.matches('div .section-style1') || e.target.matches('div .section-style2') ){
            e.preventDefault();
            obtHTML({
                url: e.target.href,                
                succes:(html)=> $main.innerHTML =  html,
                error: (err)=>$main.innerHTML = `<h1>${err}</h1>`
            })
        }
    })
}

