let row1 = document.querySelectorAll('.firstRow');
let inputs = document.querySelectorAll('input:enabled');
let palavra1 = "peido"
palavra1 = palavra1.split('')
function listener(){
    inputs = document.querySelectorAll('input:enabled');
    inputs.forEach((block, index)=>(
        block.addEventListener('keydown',(evento) => {
            if(evento.key === 'Backspace'){
                inputs[index].value = ""
                if(index !== 0){
                    inputs[index-1].focus()
                }
                console.log('volta')
            }else if(evento.key === 'Enter'){
                verify()
            }else if (/^[a-zA-Z]$/.test(evento.key)) {
                if (index !== 4) {
                    inputs[index].value = `${evento.key}`
                    inputs[index + 1].focus();
                }
            }
        })
    ))
}
function verify() {
    let palavra = new Map()
    palavra1.forEach((atual) => {
        if(palavra.has(atual)){
            palavra.set(atual, palavra.get(atual)+1)
        }else{
            palavra.set(atual, 1)
        }
    })
    inputs.forEach((valor1, index1) => {
        if(palavra.has(valor1.value) && valor1.value === palavra1[index1]){
            valor1.classList.add('correct');
            console.log(valor1)
            if(palavra.has(valor1.value)){
                palavra.set(valor1.value, palavra.get(valor1.value)-1)
            }
            if(palavra.get(valor1.value) === 0){
                palavra.delete(valor1.value)
            }
        }
    })
    inputs.forEach((valor) => {
        if(palavra.has(valor.value) && !valor.classList.contains('correct')){
            valor.classList.add('almost');
            if(palavra.has(valor.value)){
                palavra.set(valor.value, palavra.get(valor.value)-1)
            }
            if(palavra.get(valor.value) === 0){
                palavra.delete(valor.value)
            }
        }else if(!valor.classList.contains('correct') && !valor.classList.contains('almost')){
            valor.classList.add('wrong');
        }
        valor.setAttribute('disabled', 'disabled')

    })
    inputs = document.querySelectorAll('.secondRow');
    inputs.forEach(el => {
        console.log(el)
        el.removeAttribute('disabled')
    })
    listener()
}

listener()