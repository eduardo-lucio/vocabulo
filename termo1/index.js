import {loadWord1, verificar, gameState} from './gameEngine.js'

let body = document.querySelector('body')

loadWord1()

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
    }
})