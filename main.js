let matriz = shufflematriz()
//let matriz =[
//    ['1','2','3'],
//    ['4','5','6'],
//    ['7','8',''],
//]

let board = document.querySelector('.board');

drawTokens()
addEventListeners()


function drawTokens(){
    board.innerHTML = '';
    matriz.forEach(row => row.forEach(element => {
        if(element == ''){
            board.innerHTML += `<div class='empty'>${element}</div>`
        }else{
        board.innerHTML += `<div class='token'>${element}</div>`
        }
    }))
}

function addEventListeners(){
    let tokens = document.querySelectorAll('.token')
    tokens.forEach(token => token.addEventListener('click', ()=>{
        let actualPosition = searchPosition(token.innerText)
        let emptyPosition = searchPosition('')
        let movement = canItMove(actualPosition, emptyPosition)
        
        if(movement !== false){
            updateMatriz(token.innerText, actualPosition, emptyPosition)

            let resultado = compareMatriz()

            if(resultado === true){
                confetti({
                    particleCount: 150,
                    spread: 180,
                  });
            }

            drawTokens()
            addEventListeners()
        }

    }))
}

function searchPosition(element){
    let rowIndex = 0;
    let columIndex = 0;
matriz.forEach((row, index) => {
    let rowElement = row.findIndex(item => item == element)
    if(rowElement !== -1){
        rowIndex = index;
        columIndex = rowElement;
    }
 })
 return [rowIndex, columIndex]
}

function canItMove(actualPosition, emptyPosition){

    if(actualPosition[1] == emptyPosition[1]){

        if(actualPosition[0]-emptyPosition[0] > 1 || actualPosition[0]-emptyPosition-emptyPosition[0] < -1){
            return false
        }

  //      if(actualPosition[0]-emptyPosition[0] ==-1){
  //          return 'down'
  //      }else if(actualPosition[0]-emptyPosition[0] ==1){
  //          return 'up'
  //      }else{
  //          return 'noMove'
  //         }  
    }else if(actualPosition[0] == emptyPosition[0]){

        if(actualPosition[1]-emptyPosition[1] > 1 || actualPosition[1]-emptyPosition[1] < -1){
            return false
        }

  //  if(actualPosition[1]-emptyPosition[1] ==-1){
  //      return 'right'
  //  }else if(actualPosition[1]-emptyPosition[1] ==1){
  //      return 'left'
  //  }else{
  //      return 'noMove'
  //     }
   }else{
    return false
   }
}
 
function updateMatriz(element, actualPosition, emptyPosition){
    matriz[actualPosition[0]][actualPosition[1]] = ''
    matriz[emptyPosition[0]][emptyPosition[1]] = element
}

function shufflematriz(){
    let shufflematriz = [
        [],
        [],
        []
    ]

  let array = ['1','2','3','4','5','6','7','8','']
  let shufflearray = array.sort(()=> Math.random()-0.5)

  let colum = 0;
  let row = 0;

  shufflearray.forEach(element => {
    shufflematriz[row].push(element)
    if(colum < 2){
        colum++
    }else{
        colum = 0
        row++
    }
  })
  return shufflematriz
}

function compareMatriz(){
    let counter = 0;
    let finalMatriz = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8',''],
    ]
    matriz.forEach((row, indexRow) => {
        row.forEach((element, indexColum) => {
            if(element == finalMatriz[indexRow][indexColum]){
                counter++
            }
        })
    })
    if (counter == 9){
        return true
    }else{
        return false
    }
}