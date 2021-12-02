var isNotCreated=true;
var isGameActive=false;

const timeToFrame = 100;

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
});

function main() {
    const pages = {
        index: document.getElementById('index-page'),
        highscore: document.getElementById('highscore-page'),
        game: document.getElementById('game-page'),
    };

    const highscoreButtonElement = document.getElementById('highscore-btn');

    highscoreButtonElement.addEventListener('click', () => {
        pages.index.classList.add('hidden');
        pages.game.classList.add('hidden');
        pages.highscore.classList.remove('hidden');
    })

    const menuButtonElement = document.getElementById('menu-btn');

    menuButtonElement.addEventListener('click', () => {
        pages.index.classList.remove('hidden');
        pages.game.classList.add('hidden');
        pages.highscore.classList.add('hidden');
    })

    const gameMenuButtonElement = document.getElementById('game-menu-btn');

    gameMenuButtonElement.addEventListener('click', () => {
        pages.index.classList.remove('hidden');
        pages.game.classList.add('hidden');
        pages.highscore.classList.add('hidden');
        isGameActive=false;
    })

    const gameButtonElement = document.getElementById('play-btn');

    gameButtonElement.addEventListener('click', () => {
        pages.index.classList.add('hidden');
        pages.game.classList.remove('hidden');
        pages.highscore.classList.add('hidden');
        isGameActive=true;
        gameZone();
        setTimeout(game, timeToFrame);
    })
    
    function gameZone(){
        var div=document.getElementById('gameWindow');
        if(isNotCreated === true){
            for(var i = 0; i<21; i++){
                for(var j = 0; j<21; j++){
                    var newDiv = document.createElement('div');
                    newDiv.id =`${i} ${j}`;
                    newDiv.classList.add('areaBox');
                    div.appendChild(newDiv);
                    if(i === 20){
                        isNotCreated = false;
                    }
                }  
            }
        }   
    }  
        
    }

    function addPlatform(){
        for(var i = 8; i < 13; i++){
            document.getElementById(19+' '+`${i}`).classList.add('platform');
        }
        
    }

    function addBall(){
        document.getElementById(18+' '+10).classList.add('ball');
    }

    function addBlock(){
        for(var i = 2; i < 8; i++){
            for(var j = 2; j < 19; j++){
                document.getElementById(`${i}`+' '+`${j}`).classList.add('block');
            }

        }
    }

    function game(){
        addPlatform()
        addBall();
        addBlock();
        if(isGameActive) setTimeout(game, timeToFrame);
    }

    