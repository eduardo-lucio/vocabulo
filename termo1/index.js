import {loadWord1, verificar, gameState} from './gameEngine.js'

let body = document.querySelector('body')
if(document.title === '4 letter mode'){
    loadWord1('./palavras4.txt')
}else if(document.title === '5 letter mode'){
    loadWord1('./palavras5.txt')
}else if(document.title === '6 letter mode'){
    loadWord1('./palavras6.txt')
}

body.addEventListener('keyup',(tecla)=>{
    if(gameState !== 'Ingame') return
    let teclaP = tecla.key
    let currentBox = document.querySelector('.editing')
    if (!currentBox) return;
    let nextBox = currentBox.nextElementSibling
    let previousBox = currentBox.previousElementSibling
    if (/^[a-zA-Z]$/.test(teclaP)){
            currentBox.innerHTML = teclaP.toUpperCase()
            if(nextBox !== null){
                currentBox.classList.remove('editing')
                nextBox.classList.add('editing')
            }
    }else if(teclaP === 'Backspace'){
        if(currentBox.innerHTML !== "" && previousBox !== null){
            currentBox.classList.remove('editing')
            previousBox.classList.add('editing')
            currentBox.innerHTML = ""
        }else if (currentBox.innerHTML === "" && previousBox !== null){
            currentBox.classList.remove('editing')
            previousBox.classList.add('editing')
        }else{
            currentBox.innerHTML = ""
        }
    }else if(teclaP === 'Enter'){
        verificar()
    }else if(teclaP === 'ArrowLeft'){
        if(previousBox !== null){
            currentBox.classList.remove('editing')
            previousBox.classList.add('editing')
        }
    }else if(teclaP === 'ArrowRight'){
        if(nextBox !== null){
            currentBox.classList.remove('editing')
            nextBox.classList.add('editing')
        }
    }
})