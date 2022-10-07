const mario = document.getElementById('mario');
const pipe = document.getElementById('pipe');
const clouds = document.getElementById('clouds');
const game_board = document.getElementById('game-board');
const title_game_over = document.getElementById('title-game-over'); 
const btn_restart = document.getElementById('button-restart-game');
const number_score = document.getElementById('number-score');
const sound_jump = document.getElementById('sound-jump');
const sound_game_over = document.getElementById('sound-game-over');

const game_over = (positionClouds,positionPipe,positionMario) => {
    clearTimeout(loop);
    mario.src = "images/game-over.png";
    mario.style.width = '50px';
    mario.style.bottom = positionMario+"px";
    pipe.style.left = positionPipe+"px";
    clouds.style.left = positionClouds+"px";
    game_board.removeEventListener("click",jump);
    title_game_over.style.display = "block";
    btn_restart.style.display = "block";
    btn_restart.addEventListener("click",()=>{
        window.location.reload();
    });
}

const score = () => {
    let value = Number(number_score.innerHTML);
    value += 0.5;
    number_score.innerHTML = Math.round(value);
}

const jump = () => {
    sound_jump.play();
    mario.classList.add("anime-mario-now");
    setTimeout(()=>{
        mario.classList.remove("anime-mario-now");
    },800);
}

const game = () => {
    let positionClouds = clouds.offsetLeft;
    let positionPipe = pipe.offsetLeft;
    let positionMario = Number(window.getComputedStyle(mario).bottom.replace("px",""));
    if(positionMario <= 60 && positionPipe <= 110 && positionPipe >= 60){
        sound_game_over.play();
        game_over(positionClouds,positionPipe,positionMario);
    }else if(positionMario > 60 && positionPipe <= 110 && positionPipe >= 60){
        score();
    }
    console.log("rodando");
}

const loop = setInterval(() => {
    game();
},5);


game_board.addEventListener("click",jump);