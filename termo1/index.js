import {loadWord1, verificar, gameState} from './gameEngine.js'
let hiddenInput = document.getElementById('hiddenInput')
let body = document.querySelector('body')
let archive = ''
let playAgainButton = document.querySelectorAll('.playAgain')
if(document.title === '4 letter mode'){
    archive = './palavras4.txt'
}else if(document.title === '5 letter mode'){
    archive = './palavras5.txt'
}else if(document.title === '6 letter mode'){
    archive = './palavras6.txt'
}
await loadWord1(archive)
console.log(`${archive}`)
playAgainButton.forEach((botao)=>{
    botao.addEventListener('click', () => {
        location.reload()
    })
})
document.addEventListener('touchstart', () => hiddenInput.focus())
document.addEventListener('click', () => hiddenInput.focus())

hiddenInput.addEventListener('input', (e) => {
    let letra = e.target.value.toUpperCase().replace(/[^A-Z]/g,'') // só letras
    if(!letra) return
    e.target.value = ''

    let currentBox = document.querySelector('.editing')
    if(!currentBox) return

    currentBox.innerHTML = letra

    let nextBox = currentBox.nextElementSibling
    if(nextBox) {
        currentBox.classList.remove('editing')
        nextBox.classList.add('editing')
    }
})

body.addEventListener('keyup',(tecla)=>{
    if(gameState !== 'Ingame') return
    let teclaP = tecla.key
    if(tecla.target !== body && (/^[a-zA-Z]$/.test(teclaP))) return
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
            currentBox.innerHTML = ""
        }else if (currentBox.innerHTML === "" && previousBox !== null){
            currentBox.classList.remove('editing')
            previousBox.classList.add('editing')
        }else{
            currentBox.innerHTML = ""
        }
    }else if(teclaP === 'Enter'){
        verificar(archive)
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
