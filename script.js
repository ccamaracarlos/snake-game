let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....CONTEXTO = ele renderisa o desenho = coloca 2d para ficar em "2d"
let box = 32;  // criou a caixa com 32
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";  // VARIAVEL QUE cria direção
let food ={   // variavel para criar numeros aleatórios(vai criar os elementos as comidas aleatoriamente)
    x: Math.floor(Math.random() * 15 + 1) * box,     //
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){ // função -CRIARBG- para criar o canvas - criar o fundo Background
    context.fillStyle = "yellow";  // FILLSTYLE= cuida do estilo de desenho e adiciona cor
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){  // A função que cria a cobra (trabalhar com for, pois será um array)
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";  //  aqui o CONTEXT.STYLE=  está ligado a cobrinha,cor 
        context.fillRect(snake[i].x, snake[i].y, box, box);   // FILLREACT = está ligado a cobrinha, tamanho
    }
}

function drawFood (){   // função que cria a comida da cobra
    context.fillStyle = "red";        //  stylo = cor
    context.fillRect(food.x, food.y, box, box);   // novo array?
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){ 
    if(event.keyCode == 37 && direction != 'right') direction = 'left';  // quando a direção não for right-direita=  inverte a direção
    if(event.keyCode == 38 && direction != 'down') direction = 'up';     // quando a direção não for dow-baixo=  inverte a direção
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    // Plano cartesiano

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;  // ponto zero de x e y =  vai de 16 de um lado e zero do outro, (passando desses pontos ele almenta) / quando chegar em zero atribui o valor de 15
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){  // compara se a posição 0 se chocar com a posição 1  ela para o jogo e da um alerta de game over
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('GAME OVER! :(');
        }
    }

    criarBG(); 
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;  // criou duas variáveis(snakeX e Y) no array[0] para ponto de partida
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;  // aqui estão as funçoes de direção do jogo = quando for para right-direita acrescenta um box
    if(direction == "left") snakeX -= box;    // quando for para left-esquerda esta diminuindo um box
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){  // condição caso a cabeça encontre a comida, ela cresça de tamanho
        snake.pop(); // A função pop tira o último elemento da lista
            }else{
                food.x = Math.floor(Math.random() * 15 +1) * box;
                food.y = Math.floor(Math.random() * 15 +1) * box;
            }
    
    
    let newHead ={  // Variavel para 
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);  // passando um intervalo de 100-milisegunto - a cada 100 mile-segundos ela vai se renovar e não travar