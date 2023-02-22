function local(){

if(localStorage.getItem("best")==null){

	localStorage.setItem("best","0");
}   else {

	document.querySelector("h1.second").textContent =localStorage.getItem("best");
}

}


local();

let  sideUi = {
  trials: document.querySelector("h1.first"),
  best:document.querySelector("h1.second"),
   setTrialsDefault() { this.trials.textContent="0";},
   setTrials(num){ this.trials.textContent = String(num);},
   setBest(num){ let x = Number(localStorage.getItem("best"));
    if(x==0){ this.best.textContent = String(num);
        localStorage.setItem("best",String(num));

    } else if(num <x){
      this.best.textContent = String(num);
        localStorage.setItem("best",String(num));
    

    }}


};







class   Nodes {
    constructor(nodes, status){


    	this.nodes= nodes;
    	this.status = status;
    }

    setDefault(){
    	this.statusSet();

for(let node of this.nodes){

     node.style.visibility = "visible";
}


}



upHide( prevMax, max){
	this.statusSet(1);
      for(let x = prevMax-1; x<=max-1; x++){

      	this.nodes[x].style.visibility ="hidden";
      }


}
statusSet(x=0){
let normal = " Guess my number";
let low = " It's too low";
let high = "It's too high";

if( x==0){
this.status.textContent = normal;

} else if(x==1){

   this.status.textContent = low;


} else {
	this.status.textContent = high;
}
}
downHide( prevMin, min){
  this.statusSet(3);
   
for(let x = min-1; x<=prevMin-1; x++){

 this.nodes[x].style.visibility = "hidden";

}}

}


let winDisplay = { sectionWin:document.querySelector("section.win"),
     hCorrect:document.querySelector("h1.number"),
     setHide() { this.sectionWin.hidden = true;},
     show(num){   this.sectionWin.hidden = false; this.hCorrect.textContent = String(num);
      
     }};

let nodesData = new Nodes(document.querySelectorAll(".hotspot td"), document.querySelector("caption"));



let c = document.querySelector("canvas");
let b = c.getContext("2d");
let history = [];
function line(){
b.strokeStyle ="#00a7ff";
b.beginPath();
b.moveTo(0,50);
b.lineTo(800,50);
b.stroke();
b.font ="28px";
b.fillText("50",5,60);

}
line();

function graph(){
let x = history.length;
let latest = history[x-1];
let prev  =history[x-2];
  if(history.length>1){


b.strokeStyle = latest> prev ? "blue":"red";
b.beginPath();
b.moveTo((x-2)*10,100-prev);
b.lineTo((x-1)*10,100-latest);
b.stroke();


  }
}







     class GameEngine {
       constructor(){
          this.guess = Math.ceil(Math.random()*100);
          this.min =1;
          this.max =100;
          this.times =0;


       }
       

       reStart(){
      this.guess = Math.ceil(Math.random()*100);
          this.min =1;
          this.max =100;
          nodesData.setDefault();
          sideUi.setTrialsDefault();
          sideUi.setBest(this.times);
          this.times = 0;
}
         win() {
          history.push(this.guess);
          graph();
          winDisplay.show(this.guess);
           setTimeout(()=>{winDisplay.setHide();},3000);

        this.reStart();

       }
       check(num) {
         if( num >= this.min && num <= this.max){

         	return true;
         } else {
         	return false;

         }


       }  


       iguess(num){

       	if(this.check(num)){
       		this.times++;
       		sideUi.setTrials(this.times);
          if(num == this.guess){

          	this.win();
          } else if (num < this.guess){
             nodesData.upHide(this.min, num);
             this.min = num;

          } else if(num> this.guess){

           nodesData.downHide(this.max, num);
           this.max = num;
       }
      }
    }}

    let gameEngine = new GameEngine();

function  eventHandler(event){
    if(event.target.dataset["pos"]==null){

    	return;
    } else {

        gameEngine.iguess(Number(event.target.dataset["pos"]));

    }


}

let table = document.querySelector("table.hotspot");
table.addEventListener("click",eventHandler);
















