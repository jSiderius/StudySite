
function startTimer(timer, pause=false, end=false){
    // If timer data does not exist, initialize it
    if (!timer.dataset.is_timer_initialized){
        timer.dataset.is_timer_initialized = 'true';
        timer.dataset.is_timer_running = 'false';
        timer.dataset.is_timer_paused = 'false';
        timer.dataset.end_time = '0';
        timer.dataset.remaining_time_storage = '0';

        timer.dataset.work = 'true';
        // timer.dataset.work_interval = 25 * 60 * 1000;
        // timer.dataset.break_interval = 5 * 60 * 1000;
        timer.dataset.work_interval = 5 * 1000;
        timer.dataset.break_interval = 3 * 1000;
        timer.dataset.current_interval = 0;
    }

    if (end){ 
        timer.dataset.end_time = String(new Date() - 0);
        timer.dataset.is_timer_paused = false;
        return;
    }

    if (pause && timer.dataset.is_timer_running == 'true'){
        if (timer.dataset.is_timer_paused === 'true'){
            timer.dataset.is_timer_paused = 'false';
            timer.dataset.end_time = String((new Date() - 0) + Number(timer.dataset.remaining_time_storage));
        }else{
            timer.dataset.is_timer_paused = 'true';
            timer.dataset.remaining_time_storage = String(Number(timer.dataset.end_time) - (new Date() - 0));
        }
    }
    if (pause && timer.dataset.is_timer_running !== 'true'){
        return;
    }

    if (timer.dataset.is_timer_running === 'true'){
        return;
    }
    timer.dataset.is_timer_running = "true";
    

    const hour_div = timer.querySelector('#HR');
    const minute_div = timer.querySelector('#MIN');
    const second_div = timer.querySelector('#SEC');

    if (timer.dataset.work === 'true'){
        timer.dataset.current_interval = Number(timer.dataset.work_interval)
    }else {
        timer.dataset.current_interval = Number(timer.dataset.break_interval)
    }
    timer.dataset.end_time = String(new Date() - 0 + Number(timer.dataset.current_interval));
    
    const semicircles = timer.querySelectorAll('.semicircle');
    semicircles[0].style.display = 'block'
    semicircles[1].style.display = 'block'
    semicircles[2].style.display = 'block'


    const timerloop = setInterval(updateTimer)

    function updateTimer(){
        if (timer.dataset.is_timer_paused === 'true'){
            return;
        }

        let cur_time = new Date() - 0;
        const dif_time = Number(timer.dataset.end_time) - cur_time
        

        const angle = 360.0 * dif_time / Number(timer.dataset.current_interval) 
        if (angle > 180){
            semicircles[2].style.display = 'none';
            semicircles[0].style.transform = 'rotate(180deg)';
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        } else {
            semicircles[2].style.display = 'block';
            semicircles[0].style.transform = `rotate(${angle}deg)`;
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        }

        let hours = Math.floor(dif_time / (1000 * 60 * 60));
        let minutes = Math.floor((dif_time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((dif_time % (1000 * 60)) / (1000));

        hour_div.innerHTML = String(hours).padStart(2, '0');
        minute_div.innerHTML = String(minutes).padStart(2, '0');
        second_div.innerHTML = String(seconds).padStart(2, '0');

        if (dif_time < 0) {
            hour_div.innerHTML = '00';
            minute_div.innerHTML = '00';
            second_div.innerHTML = '00';

            // TODO: FOR A TRUE END
            // clearInterval(timerloop)
            // timer.dataset.is_timer_running = false
            // semicircles[0].style.display = 'none'
            // semicircles[1].style.display = 'none'
            // semicircles[2].style.display = 'none'

            if (timer.dataset.work === 'true'){
                timer.dataset.work = 'false'
                timer.dataset.end_time = String((new Date() - 0) + Number(timer.dataset.break_interval));
                timer.dataset.current_interval = timer.dataset.break_interval;
                semicircles[0].style.backgroundColor = '#088b8b';
                semicircles[1].style.backgroundColor = '#088b8b';
                document.getElementById('pomo-text').innerHTML = 'Break'
            }else{
                timer.dataset.work = 'true'
                timer.dataset.end_time = String((new Date() - 0) + Number(timer.dataset.work_interval));
                timer.dataset.current_interval = timer.dataset.work_interval;
                semicircles[0].style.backgroundColor = '#b94949';
                semicircles[1].style.backgroundColor = '#b94949';
                document.getElementById('pomo-text').innerHTML = 'Work';
            }

            const bellSound = new Audio("http://127.0.0.1:8000/static/widget_homepage/audio/bell-sound.wav");
            bellSound.play();

        }
    }
}

function createPomodoroTimer(id) {
    // {% comment %} <div class="main-circle center">
    //                 <div class="semicircle"></div>
    //                 <div class="semicircle"></div>
    //                 <div class="semicircle"></div>
    //                 <div class="outermost-circle"></div>
    //                 <div class="timer">
    //                     <div id="HR">00</div>
    //                     <div class="colon">:</div>
    //                     <div id="MIN">00</div>
    //                     <div class="colon">:</div>
    //                     <div id="SEC">00</div>
    //                 </div>
    //             </div>
                
    //             <button class="timer-btn">Start</button> {% endcomment %}

    // Create the main widget container
    const widget = document.createElement('div');
    widget.classList.add('pomodoro-timer', 'widget');
    widget.setAttribute('draggable', 'true');
    widget.id = id

    // Create the main circle container
    const mainCircle = document.createElement('div');
    mainCircle.classList.add('main-circle', 'center');

    // Create and append three semicircles to the main circle
    for (let i = 0; i < 3; i++) {
        const semicircle = document.createElement('div');
        semicircle.classList.add('semicircle');
        mainCircle.appendChild(semicircle);
    }

    // Create and append the outermost circle
    const outermostCircle = document.createElement('div');
    outermostCircle.classList.add('outermost-circle');
    mainCircle.appendChild(outermostCircle);
    
    // Create the timer container with hours, minutes, and seconds
    const timer = document.createElement('div');
    timer.classList.add('timer');

    const hr = document.createElement('div');
    hr.id = 'HR';
    hr.textContent = '00';
    timer.appendChild(hr);

    const colon1 = document.createElement('div');
    colon1.classList.add('colon');
    colon1.textContent = ':';
    timer.appendChild(colon1);

    const min = document.createElement('div');
    min.id = 'MIN';
    min.textContent = '00';
    timer.appendChild(min);

    const colon2 = document.createElement('div');
    colon2.classList.add('colon');
    colon2.textContent = ':';
    timer.appendChild(colon2);

    const sec = document.createElement('div');
    sec.id = 'SEC';
    sec.textContent = '00';
    timer.appendChild(sec);

    // Append the timer to the main circle
    mainCircle.appendChild(timer);

    const info_text = document.createElement('div');
    info_text.classList.add('pomo-text');
    info_text.id = 'pomo-text'
    info_text.textContent = 'Work';
    mainCircle.appendChild(info_text)

    // Append the main circle to the widget
    widget.appendChild(mainCircle);

    // Create the container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('horizontal-button-container');  // Add a class for styling

    // Create and append the start button
    const startButton = document.createElement('button');
    startButton.classList.add('timer-btn');
    startButton.textContent = 'Start';
    startButton.addEventListener('click', () => startTimer(widget));
    buttonContainer.appendChild(startButton);

    // Create and append the pause button
    const pauseButton = document.createElement('button');
    pauseButton.classList.add('timer-btn');
    pauseButton.textContent = 'Pause / Unpause';
    pauseButton.addEventListener('click', () => startTimer(widget, true));
    buttonContainer.appendChild(pauseButton);
    
    // Create and append the end button
    const endButton = document.createElement('button');
    endButton.classList.add('timer-btn');
    endButton.textContent = 'End';
    endButton.addEventListener('click', () => startTimer(widget, false, true));
    buttonContainer.appendChild(endButton);

    // Append the button container to the widget
    widget.appendChild(buttonContainer);

    const container = document.createElement('div');
    container.classList.add('widget');
    container.setAttribute('draggable', 'true');
    container.id = id

    container.appendChild(widget)

    // Return the generated widget
    return container;
}
