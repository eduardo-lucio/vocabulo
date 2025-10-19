let body = document.querySelector('body')
let gameState = 'Ingame'
let word = []

let isWordLoaded = false
let wordPromise = loadWord().then((palavraFinal) => {
    word = palavraFinal.toUpperCase().split('')
    isWordLoaded = true
})

let checkPromise = setInterval(() => {
    if(!isWordLoaded){
        console.log('carregando')
    }else {
        console.log('carregou')
        clearInterval(checkPromise)
    }
}, 500)
async function loadWord (){
    let palavra = "";
    try{
        palavra = await fetch('https://api.dicionario-aberto.net/random')
        let palavra1 = await palavra.json()
        let palavra2 = palavra1.word.toUpperCase()
        palavra2 = palavra2.split('')
        if(palavra2.length !== 6){
            return loadWord()
        }
        return await palavra1.word
    }catch(error){
        console.log(error)
    }
}

let wordMap = new Map()
function verifyGreen(atualBox, index){
    if(atualBox.innerHTML === word[index] && wordMap.has(atualBox.innerHTML)){
        atualBox.classList.add('correct')
        wordMap.set(atualBox.innerHTML, wordMap.get(atualBox.innerHTML) - 1)
        if(wordMap.get(atualBox.innerHTML) === 0){
            wordMap.delete(atualBox.innerHTML)
        }
    }
}
function verifyYellow(atualBox){
    if(wordMap.has(atualBox.innerHTML) && !atualBox.classList.contains('correct')){
        atualBox.classList.add('almost')
        wordMap.set(atualBox.innerHTML, wordMap.get(atualBox.innerHTML) - 1)
        if(wordMap.get(atualBox.innerHTML) === 0){
            wordMap.delete(atualBox.innerHTML)
        }
    }else if(!atualBox.classList.contains('correct')){
        atualBox.classList.add('wrong')
    }
}
function verificar(){
    wordMap.clear()
    word.forEach((atual) => {
        if(wordMap.has(atual)){
            wordMap.set(atual, wordMap.get(atual)+1)
        }else{
            wordMap.set(atual, 1)
        }
    })
    let currentBoxes = document.querySelectorAll('.current')
    let inputWord = ""
    let empty = Array.from(currentBoxes).some(box => box.innerHTML === "")
    if(empty){
        alert(`digite ${word.length} letras`)
        return
    }
    currentBoxes.forEach((box, index)=>{
        verifyGreen(box, index)
        inputWord += box.innerHTML
    })

    if(inputWord === word.join('')){
        console.log('o')
        alert('voce ganho')
        gameState = 'Win'
    }else {
        console.log(inputWord, word)
        currentBoxes.forEach((box) => {
            verifyYellow(box)
            box.classList.add('disabled')
            if (box.classList.contains('editing')) {
                box.classList.remove('editing')
            }
        })
        changeRow()
    }
}
function changeRow(){
    let currentBox = document.querySelector('.current')
    if(!currentBox) return

    let currentRow = currentBox.parentElement
    if(!currentRow){

    }
    let nextRow = currentRow.nextElementSibling

    currentRow.querySelectorAll('.current').forEach(box => {
        box.classList.remove('current')
    })

    if(!nextRow){
        alert('acabou')
        gameState = 'Lose'
        return
    }

    let nextBox = Array.from(nextRow.children)

    nextBox.forEach((box) => {
        box.classList.add('current')
        box.classList.remove('disabled')

    })
    nextBox[0].classList.add('editing')
}
function loadRow(){
    return document.querySelector('.editing')
}

body.addEventListener('keyup',(tecla)=>{
    if(gameState !== 'Ingame') return
    let teclaP = tecla.key
    console.log(word)
    let currentBox = loadRow()
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