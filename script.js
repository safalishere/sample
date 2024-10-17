document.getElementById('promptForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const prompt = document.getElementById('prompt').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const gameData = await response.json();
        displayGame(gameData);
    } catch (error) {
        console.error('Error generating game:', error);
    }
});

function displayGame(gameData) {
    const gameDisplay = document.getElementById('gameDisplay');
    if (gameData.game_type === 'chess') {
        gameDisplay.innerHTML = `
            <h2>${gameData.description}</h2>
            <div class="chessboard">
                ${gameData.board.map(row => row.map(square => `
                    <div class="square ${square.color}"></div>
                `).join('')).join('')}
            </div>
        `;
    } else {
        gameDisplay.innerHTML = `<p>${gameData.description}</p>`;
    }
}
