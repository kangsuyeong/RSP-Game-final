import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 박스 2개 (타이틀,사진,결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3 4 의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바뀐다. (이기면-초록,지면-빨강, 비기면 -검은색)

//선택
const choice = {
  rock : {
    name : "Rock",
    img : "img/rock.jpg"
  },
  scissors :{
    name : "Scissors",
    img : "img/scissors.jpg"
  },
  paper :{
    name : "Paper",
    img : "img/paper.jpg"
  },
  default:{
    name : "default",
    img : "img/game.jpg"
  }
}

function App() {
  //state 함수
const [userSelect,setUserSelect] = useState(choice.default)
const [comSelect,setComSelect] = useState(choice.default)
const [result,setResult] = useState("GAME START")
const [userScore,setUserScore] = useState(0)
const [comScore,setComScore] = useState(0)

//랜덤한 값을 만드는 함수
const randomFunction = ()=>{
  let itemArray = Object.keys(choice) //객체의 키값만 뽑아서 Array로 만든다.
  let randomNum = Math.floor(Math.random()*(itemArray.length-1))
  let computerSelect = itemArray[randomNum] //컴퓨터가 뭐를 고를지 정한다.
  return choice[computerSelect]
}

// 버튼을 클릭했을 때 실행되는 함수
const play = (user)=>{
  setUserSelect(choice[user]) // 유저가 선택한 것

  let computerSelect=randomFunction()
  setComSelect(computerSelect) // 컴퓨터가 선택한 것
  setResult(gameResult(choice[user],computerSelect)) // 승패 가리기
  gameScore(gameResult(choice[user],computerSelect))
}

// 승패를 가리는 함수
const gameResult = (user,com)=>{
  console.log("result user",user,"com",com)
  // 유저랑 컴퓨터랑 같으면 비긴것
  // 유저가 주먹일때 컴퓨터가 가위면 승
  // 유저가 가위일때 컴퓨터가 보면 승
  // 유저가 보일때 컴퓨터가 바위면 승
  if(user.name===com.name){
    return "tie"
  }
  else if(user.name==="Rock")
    return com.name==="Scissors"?"win":"lose"
  else if(user.name==="Scissors")
    return com.name==="Paper"?"win":"lose"
  else if(user.name==="Paper")
    return com.name==="Rock"?"win":"lose"
}

const gameScore = (userState)=>{
  if(userState==="win"){
    setUserScore(userScore+1)
  }
  else if(userState==="lose"){
    setComScore(comScore+1)
  }
}

const resetGame = ()=>{
  setUserSelect(choice.default)
  setComSelect(choice.default)
  setResult("GAME START")
  setUserScore(0)
  setComScore(0)
}

  return (
    <div>
      <div className="container">
        <Box title="USER" item={userSelect} result={result}/>

        <div className="score-ara">
          <h2>USER</h2>
          <h1 className={result==="win"?"winColor":""}>{userScore}</h1>
        </div>

        <div className="score-ara">
          <h2>COMPUTER</h2>
          <h1 className={result==="lose"?"winColor":""}>{comScore}</h1>
        </div>

        <Box title="COMPUTER" item={comSelect} result={result}/>
      </div>

      <div>
        <div className="button-area">
          <button className="button-rsp" onClick={()=>play("rock")}><img className="button-icon-size" src="img/rock.jpg"/></button>
          <button className="button-rsp" onClick={()=>play("scissors")}><img className="button-icon-size" src="img/scissors.jpg"/></button>
          <button className="button-rsp" onClick={()=>play("paper")}><img className="button-icon-size" src="img/paper.jpg"/></button>
        </div>

        <div className="reset-area">
          <h2>
            reset
          </h2>
          <button className="button-rsp" onClick={resetGame}><img className="reset-icon-size" src="img/reset.jpg"/></button>
        </div>
      
      </div>
      

      
    </div>
  );
}

export default App;
