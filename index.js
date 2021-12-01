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
    })

    const gameButtonElement = document.getElementById('play-btn');

    gameButtonElement.addEventListener('click', () => {
        pages.index.classList.add('hidden');
        pages.game.classList.remove('hidden');
        pages.highscore.classList.add('hidden');
    })
    
}