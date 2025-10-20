async function loadWord1(){
    let wordFetch = await fetch('palavras6.txt')
    let wordText = await wordFetch.text()
    let finalWord = wordText.split('\n')
    let randomWord = finalWord[Math.floor(Math.random() * finalWord.length)]
    word = randomWord.toUpperCase().split('')
    word.pop()
    console.log(randomWord)
}

function verifyGreen(atualBox, index){
    if(atualBox.innerHTML === word[index] && wordMap.has(atualBox.innerHTML)){
        atualBox.classList.add('correct')
        atualBox.classList.remove('current')
        if (atualBox.classList.contains('editing')) {
            atualBox.classList.remove('editing')
        }
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
let gameState = 'Ingame'
let word = []
let wordMap = new Map()
async function verificar(){
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
    let msg = document.querySelector('#message')
    if(empty){
        msg.innerHTML = `Digite ${word.length} letras`
        return
    }
    msg.innerHTML = ''

    currentBoxes.forEach((box, index)=>{
        verifyGreen(box, index)
        inputWord += box.innerHTML
    })

    if(inputWord === word.join('')){
        let bg = document.querySelector('#background')
        let winDiv = document.querySelector('#win')
        winDiv.style.display = 'block'
        bg.style.display = 'block'
        gameState = 'Win'
    }else {
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
        let bg = document.querySelector('#background')
        let loseDiv = document.querySelector('#lose')
        let loseMessage = document.querySelector('#lose > p')
        loseMessage.innerHTML = `A palavra era ${word.join('').toLowerCase()}!`
        loseDiv.style.display = 'block'
        bg.style.display = 'block'
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
export {loadWord1, verifyGreen, verifyYellow, verificar, changeRow, gameState, word, wordMap}