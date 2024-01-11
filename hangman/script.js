 // i asked chatgpt to generate 20 random words from objects that can be found at home
const wordPool = [
    'chair', 'table', 'lamp', 'couch', 'mirror',
    'clock', 'television', 'bookshelf', 'bed', 'pillow',
    'blanket', 'vase', 'candle', 'picture', 'oven',
    'refrigerator', 'microwave', 'dishwasher', 'kettle'
  ];
  
  let selectedWord = '';
  let wordLetters = [];
  let incorrect = [];
  let hearts = 6;

  // i asked chatgpt how to select a radnom word from a wordlist in js
  function randomWordSelection() {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    return wordPool[randomIndex];
  }
  
  function start() {
    selectedWord = randomWordSelection();
    wordLetters = [];
  
    for (let i = 0; i < selectedWord.length; i++) {
      wordLetters.push('_');
    }
  
    incorrect = [];
    refresh();
  }
  
  // chatgpt also kinda helped here
  function refresh() {
    document.getElementById('wordDiv').innerHTML = `Word: ${wordLetters.join(' ')}`;
    document.getElementById('incorrect').innerHTML = `Incorrect Letters: ${incorrect.join(', ')}`;
    document.getElementById('heartsDiv').innerHTML = `Hearts: ${'❤️'.repeat(hearts)}`;
  }
  // i made this function so the whole word can be guessed at once instead of letter by letter, if the game had a scoring system this would grant more points
  function submit() {
    const userInput = document.getElementById('user-input').value;
    
    if (userInput.length === 1) {
      inputLetter(userInput);
    } else if (userInput.length >= 2) {
      inputWord(userInput);
    }
  
    document.getElementById('user-input').value = '';
    state();
  }
  
  function inputLetter(letter) {
    if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
          wordLetters[i] = letter;
        }
      }
    } else {
      incorrect.push(letter);
      hearts--;
    }
  
    refresh();
  }
  
  function inputWord(word) {
    if (word == selectedWord) {
      wordLetters = Array.from(selectedWord);
    } else {
      incorrect.push(word);
      hearts--;
    }
  
    refresh();
  }
  
  // if you are out of hearts you've lost, if no underscores are present that means the whole word has been guessed and you've won
  function state() {
    if (hearts === 0) {
      alert('Game over!');
      start();
    } else if (!wordLetters.includes('_')) {
      alert('You guessed the right word!');
      start();
    }
  }
  
  function play() {
    start();
  }
  
  play();
  