class Quiz {
  constructor(){
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow")

    //write code to show a heading for showing the result of Quiz
     textSize(25);
     text("RESULT OF QUIZ",300,60)

 //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
   
 //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue")
      textSize(25)
 //write code to add a note here
      text("*Note:Contestant who answer correct are shown in green colour!" ,110,230)
      var Yposition = 290;

 //write code to highlight contest who answered correctly
 for (var plr in allContestants){
  var CorrectAns = "2"
  Yposition += 50
  if(CorrectAns === allContestants[plr].answer)
   fill("green")
  else
   fill("red");

   text(allContestants[plr].name + " : " + allContestants [plr].answer,350,Yposition)
 
  }
 }
}

}
