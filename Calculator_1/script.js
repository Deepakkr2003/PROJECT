let string="";
let buttons= document.querySelectorAll('.button');
let bracket = document.querySelector('.bracket');
let backspace = document.querySelector('backspace');
// console.log(bracket);
let openingBracket = false;

let back = false;

Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML === '()'){
            if(!openingBracket){
                document.querySelector('input').value += "(";
                string = document.querySelector('input').value;
            }else{
                document.querySelector('input').value += ")";
                string = document.querySelector('input').value;
            }
            openingBracket = !openingBracket;
        }
        else if(e.target.innerHTML === '='){
            string =eval(string)
            document.querySelector('input').value = string;
        }
        else if(e.target.innerHTML === 'C'){
            string =""
            document.querySelector('input').value = string;
        }else if(e.target.className === "button backspace"){
            string = string.slice(0, string.length - 1);
            document.querySelector('input').value = string;
            back = !back;
        }
        else{
        // console.log(e.target.className)
        string += e.target.innerHTML;
        document.querySelector('input').value=string;
        }
        
    })
})