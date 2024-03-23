const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

//let's create a function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //we have to make UI also empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText="Current Player-"+currentPlayer;
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap the turns
        swapTurn();
        //check if someone has won or not
        checkGameOver();
        

    }
}

function swapTurn(){
    if (currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //Update the UI
    gameInfo.innerText="Current Player-"+currentPlayer; 
}

function checkGameOver(){
   let answer="";

   winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]!==""] || gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }
            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";

            });

            //Now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }

   });

   //It means we have a winner
   if(answer!==""){
        gameInfo.innerText="Winner Player-"+answer;
        newGameBtn.classList.add("active");

        return;

   }
   let count=0;
   gameGrid.forEach((box)=>{
    if(box!==""){
        count++;
    }
   })
   if(count===9){
    gameInfo.innerText="Game Tied";
    newGameBtn.classList.add("active");
   }


}


newGameBtn.addEventListener("click",initGame);