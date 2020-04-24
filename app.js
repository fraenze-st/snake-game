document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 11;
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2, 1, 0] //so the div in our grid being 2 (the HEAD), and 0 being the end (Tail) and 1s beeing the body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with all the outcomes of the snake
    function moveOutcomes() {
        // deals with snake hitting border and snake hitting self
        if (
            //if snake hits bottom
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            //if snake hits right wall
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            //if snake hits left wall
            (currentSnake[0] % width === 0 && direction === -1) ||
            //if snake hits top
            (currentSnake[0] - width < 0 && direction === -width) ||
            //if snake touches itself
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop() //removes last item of the array
        squares[tail].classList.remove('snake') //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head
        // squares[currentSnake[0]].classList.add("snakeHead")

        // squares[currentSnake[1]].classList.remove("snakeHead")

        // add open mouth and direction of open mouth
        if (squares[currentSnake[0] + direction] && direction === -width) {
            squares[currentSnake[0]].classList.add("upOpenMouth")
            squares[currentSnake[1]].classList.remove("upOpenMouth")
            squares[currentSnake[1]].classList.remove("downOpenMouth")
            squares[currentSnake[1]].classList.remove("leftOpenMouth")
            squares[currentSnake[1]].classList.remove("rightOpenMouth")
        } else if (squares[currentSnake[0] + direction] && direction === width) {
            squares[currentSnake[0]].classList.add("downOpenMouth")
            squares[currentSnake[1]].classList.remove("upOpenMouth")
            squares[currentSnake[1]].classList.remove("downOpenMouth")
            squares[currentSnake[1]].classList.remove("leftOpenMouth")
            squares[currentSnake[1]].classList.remove("rightOpenMouth")
        } else if (squares[currentSnake[0] + direction] && direction === -1) {
            squares[currentSnake[0]].classList.add("leftOpenMouth")
            squares[currentSnake[1]].classList.remove("upOpenMouth")
            squares[currentSnake[1]].classList.remove("downOpenMouth")
            squares[currentSnake[1]].classList.remove("leftOpenMouth")
            squares[currentSnake[1]].classList.remove("rightOpenMouth")
        } else if (squares[currentSnake[0] + direction] && direction === 1) {
            squares[currentSnake[0]].classList.add("rightOpenMouth")
            squares[currentSnake[1]].classList.remove("upOpenMouth")
            squares[currentSnake[1]].classList.remove("downOpenMouth")
            squares[currentSnake[1]].classList.remove("leftOpenMouth")
            squares[currentSnake[1]].classList.remove("rightOpenMouth")
        }


        //deals with snake eating apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[currentSnake[0]].classList.add('eatenApple') //digest apple
            squares[tail].classList.add('snake')
            currentSnake.push(tail)

            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        // remove digested apple
        if (squares[currentSnake[currentSnake.length - 1]].classList.contains('eatenApple')) {
            squares[currentSnake[currentSnake.length - 1]].classList.remove('eatenApple')
        }


        squares[currentSnake[0]].classList.add('snake')
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')

    }

    const btnRight = document.querySelector('.btn-right');
    const btnLeft = document.querySelector('.btn-left');
    const btnUp = document.querySelector('.btn-up');
    const btnDown = document.querySelector('.btn-down');


    //assign functions to keycode
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 //right arrow and keyboard, snake to right
        } else if (e.keyCode === 38) {
            direction = -width //up arrow, snake goes 1square up (meaning 10indexes in array)

        } else if (e.keyCode === 37) {
            direction = -1 //leftarrow on keyboard, snake to left

        } else if (e.keyCode === 40) {
            direction = +width //down arrow
        }

    }

    //assign direction of snake to direction-buttons
    btnRight.addEventListener('click', function () {
        direction = 1;
    })

    btnLeft.addEventListener('click', function () {
        direction = -1;
    })

    btnUp.addEventListener('click', function () {
        direction = -width;
    })

    btnDown.addEventListener('click', function () {
        direction = +width;
    })

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});