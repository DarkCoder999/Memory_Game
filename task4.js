const api_url = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=2&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=20&limit=25&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var arr1=[];
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    for(let i=0;i<25;i++){
        var w = (data[i].word);
        arr1.push(w);
    }
    var arr = [...arr1, ...arr1, ...arr1];
    var seconds=60;
    var minutes=0;
    var c=0;
    var Points=0;
    var lives=3;
    var already_seen={}
    for(let i=0;i<(arr1.length); ++i)
    already_seen[arr[i]]=0;
    console.log(already_seen);
    shuffleArray(arr);
    click();
    display(c);
    function shuffleArray(array) {
        return array.sort( ()=>Math.random()-0.5 );
    }
    function click(val){
    function TimeChange(){
        const min = Math.floor(seconds/60);
        let sec = seconds % 60;
        seconds--;
        if(seconds<0){
            remainingTime.innerHTML = "00:00";
            GameEnd();
        } 
        if(sec>=10){
            remainingTime.innerHTML =  'Time left: 0'+min + ':' + sec;
        }
        else{
            remainingTime.innerHTML =  'Time left: 0'+min + ':0' + sec;
        }
    }
    remainingTime = document.getElementById("clock");
    duration = setInterval(TimeChange,1000);
    };
    function display(c){
        document.getElementById('text').innerHTML=arr[c];
    };   
    document.getElementById("new").addEventListener("click",newf);
    document.getElementById("seen").addEventListener("click",seenf);
    function newf(){
        if(already_seen[arr[c]]==0){
        Points = Points + Math.floor(100/seconds);  
        document.querySelector("h4").innerHTML = "Your Score : " + Points ;
        already_seen[arr[c]]=1;
        }
        else{
        lives--;
        if(lives==0){
            GameEnd();
        }
        document.querySelector("h2").innerHTML = "Lives:" + lives;
        }
        c++;
        if(c==arr.length){
            GameEnd();
        }
        else{
            display(c);
        }
    }
    function seenf(){
        if(already_seen[arr[c]]==0){
            lives--;
        if(lives==0){
            GameEnd();
        }
        document.querySelector("h2").innerHTML = "Lives:" + lives;
        }
        else{
            Points = Points + Math.floor(seconds/5);  
            document.querySelector("h4").innerHTML = "Your Score : " + Points ;
        }
        c++;
        if(c==arr.length){
            GameEnd();
        }
        else{
            display(c);
        }
    }
    function GameEnd(){
        document.querySelector("h1").innerHTML = "Game Ended!!!";
        clearInterval(duration);
        document.getElementById("new").disabled="true";
        document.getElementById("seen").disabled="true";
    }
}
getapi(api_url);