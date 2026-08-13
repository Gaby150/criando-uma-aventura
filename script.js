// Elementos do DOM
const textElement = document.getElementById('text-box');
const choiceButtonsElement = document.getElementById('choice-buttons');

// Estado do jogador (pode ser expandido com inventário, vida, etc.)
let state = {};

// Função para iniciar o jogo
function startGame() {
  state = {};
  showScene(1);
}

// Algoritmo principal: Exibe a cena com base no ID
function showScene(sceneId) {
  const scene = scenes.find(s => s.id === sceneId);
  textElement.innerText = scene.text;

  // Limpa os botões anteriores
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }

  // Cria novos botões para cada escolha da cena
  scene.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectOption(option));
    choiceButtonsElement.appendChild(button);
  });
}

// Trata a escolha do jogador
function selectOption(option) {
  const nextSceneId = option.nextScene;

  if (nextSceneId <= 0) {
    // Se o ID for 0 ou negativo, reinicia o jogo
    return startGame();
  }

  showScene(nextSceneId);
}

// Estrutura de dados das cenas do jogo (Árvore de Decisão)
const scenes = [
  {
    id: 1,
    text: 'Você acorda na entrada de uma caverna escura. À sua frente, há dois caminhos: um túnel iluminado por cogumelos brilhantes e uma escadaria de pedra que desce nas sombras.',
    options: [
      { text: 'Entrar no túnel iluminado', nextScene: 2 },
      { text: 'Descer a escadaria escura', nextScene: 3 }
    ]
  },
  {
    id: 2,
    text: 'Os cogumelos emitem uma luz azul suave. Você encontra um baú antigo trancado com um enigma digitado em uma pedra: "O que vem primeiro no código: IF ou ELSE?"',
    options: [
      { text: 'Responder "IF"', nextScene: 4 },
      { text: 'Responder "ELSE"', nextScene: 5 }
    ]
  },
  {
    id: 3,
    text: 'Você tropeça em um degrau na escuridão e acorda um Dragão de Bugs! Ele lança um erro do tipo "NullPointerException" e devora sua sessão de jogo.',
    options: [
      { text: 'Tentar Novamente 🔄', nextScene: -1 }
    ]
  },
  {
    id: 4,
    text: 'O baú se abre! Dentro dele está a lendária "Lógica Perfeita". Você concluiu sua jornada como um Mestre dos Algoritmos! 🎉',
    options: [
      { text: 'Jogar Novamente 🏆', nextScene: -1 }
    ]
  },
  {
    id: 5,
    text: 'A pedra pisca em vermelho: "Erro de Sintaxe!". Uma armadilha é ativada e você cai no limbo do código infinito.',
    options: [
      { text: 'Tentar Novamente 🔄', nextScene: -1 }
    ]
  }
];

// Inicia o jogo assim que a página carrega
startGame();
