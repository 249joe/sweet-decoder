let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let type2 = document.querySelector("#type2");
let type1 = document.querySelector("#type1");
let btn = document.querySelector("#btn");

//&#x

if (localStorage.getItem("data")) {
    let data = JSON.parse(localStorage.getItem("data"));
    input1.value = data.input1;
    input2.value = data.input2;
    type1.value = data.type1;
    type2.value = data.type2
}
function String2Hex(tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
};
function String2Url(tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += '%'+tmp[i].charCodeAt(0).toString(16);
    }
    return str;
};
function String2Html(tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += '&#x'+tmp[i].charCodeAt(0).toString(16)+';';
    }
    return str;
};
let handel = ()=>{
    if(type2.value === "url" ){
        input2.value = encodeURIComponent(input1.value);
        input2.value = String2Url(input1.value);
    }else if(type2.value === "utf8"){
        if(type1.value === "base64"){
            input2.value =    atob(input1.value)
           }else if(type1.value === "utf8"){
               input2.value = input1.value
            }else{
                input2.value = "sorry this version don't support this type of conversion yet.."
            }
            
            
        }else if (type2.value === "base64"){
                input2.value = btoa(input1.value)
            }else if(type2.value === "hex"){
                input2.value = String2Hex(input1.value);
                
            }else if(type2.value === "html"){
                input2.value = String2Html(input1.value);
                
            }
            localStorage.setItem("data",JSON.stringify({
                "input1":input1.value,
                "input2":input2.value,
                "type1":type1.value,
                "type2":type2.value
            }))
        }
        
        
        input1.addEventListener("keyup",()=>{
            console.log(type2.value);
            handel()
        })
        
        type2.addEventListener("change",()=>{
            handel()
        })
        type1.addEventListener("change",()=>{
    handel()
})
btn.addEventListener("click",()=>{
    handel();
})

// copy function 
function showCopid(){
     copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> copy'
}
let copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click",(e)=>{
    navigator.clipboard.writeText(input2.value);
    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> copied';
    setTimeout(showCopid,600)
}) 
