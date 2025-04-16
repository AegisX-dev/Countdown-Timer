// Utility to pad numbers with leading zeros
function padNumber(num) {
    return num < 10 ? `0${num}` : num;
}

// Update timer display with days, hours, minutes, seconds
function updateTimerDisplay(wrapper, days, hours, minutes, seconds) {
    wrapper.querySelector('.days').textContent = padNumber(days);
    wrapper.querySelector('.hours').textContent = padNumber(hours);
    wrapper.querySelector('.minutes').textContent = padNumber(minutes);
    wrapper.querySelector('.seconds').textContent = padNumber(seconds);
}

// Helper function to play sound multiple times with delay
function playSoundMultipleTimes(audioElement, times, delay) {
    let count = 0;
    function playNext() {
        if (count < times) {
            audioElement.currentTime = 0; // Reset sound to start
            audioElement.play().catch(() => console.log('Audio failed to play')); // Play sound
            count++;
            setTimeout(playNext, delay); // Schedule next play after delay
        }
    }
    playNext();
}

// Setup timer functionality: start, stop, reset, delete
function setupTimer(wrapper) {
    const dateInput = wrapper.querySelector('.date-input');
    const timeInput = wrapper.querySelector('.time-input');
    const startBtn = wrapper.querySelector('.start-btn');
    const stopBtn = wrapper.querySelector('.stop-btn');
    const resetBtn = wrapper.querySelector('.reset-btn');
    const deleteBtn = wrapper.querySelector('.delete-btn');
    const message = wrapper.querySelector('.message');
    const timerSound = document.getElementById('timer-sound');

    let interval = null;

    // Start the countdown
    startBtn.addEventListener('click', () => {
        console.log('Start button clicked'); // Debug
        const dateValue = dateInput.value;
        const timeValue = timeInput.value;

        if (!dateValue || !timeValue) {
            message.textContent = 'Please enter date and time!';
            message.classList.add('show');
            setTimeout(() => message.classList.remove('show'), 2000);
            return;
        }

        const targetDate = new Date(`${dateValue}T${timeValue}:00`);
        const now = new Date();

        // Allow today’s date (including current time)
        if (targetDate < now) {
            message.textContent = 'Target time is in the past! Counting down to zero.';
            message.classList.add('show');
            setTimeout(() => message.classList.remove('show'), 2000);
        }

        if (interval) clearInterval(interval);
        wrapper.classList.add('running');

        interval = setInterval(() => {
            const currentTime = new Date();
            let diff = targetDate - currentTime;

            // If target is in the past, count down from the difference (could be negative, handled below)
            if (diff <= 0) {
                clearInterval(interval);
                updateTimerDisplay(wrapper, 0, 0, 0, 0);
                wrapper.classList.remove('running');
                message.textContent = 'Time’s Up!';
                message.classList.add('show');
                playSoundMultipleTimes(timerSound, 3, 500); // Play sound 3 times with 500ms delay
                setTimeout(() => message.classList.remove('show'), 3000);
                interval = null; // Reset interval
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);

            const seconds = totalSeconds % 60;
            const minutes = totalMinutes % 60;
            const hours = totalHours % 24;
            const days = totalDays;

            updateTimerDisplay(wrapper, days, hours, minutes, seconds);
        }, 1000);

        wrapper.dataset.interval = interval; // Store for reference
    });

    // Stop the countdown
    stopBtn.addEventListener('click', () => {
        console.log('Stop button clicked'); // Debug
        if (interval) {
            clearInterval(interval);
            interval = null;
            wrapper.classList.remove('running');
            message.textContent = 'Paused';
            message.classList.add('show');
            setTimeout(() => message.classList.remove('show'), 2000);
        }
    });

    // Reset the timer
    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked'); // Debug
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        wrapper.classList.remove('running');
        updateTimerDisplay(wrapper, 0, 0, 0, 0);
        dateInput.value = '';
        timeInput.value = '';
        message.textContent = 'Reset';
        message.classList.add('show');
        setTimeout(() => message.classList.remove('show'), 2000);
    });

    // Delete the timer
    deleteBtn.addEventListener('click', () => {
        console.log('Delete button clicked'); // Debug
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        wrapper.parentElement.remove();
    });
}

// Add a new timer and move the add button to the bottom
function addNewTimer() {
    console.log('Add timer button clicked'); // Debug

    let newContainer;

    // Try to find an existing .transparent-container to clone
    const originalContainer = document.querySelector('.transparent-container');
    if (originalContainer) {
        newContainer = originalContainer.cloneNode(true);
    } else {
        // If no container exists, create a new one programmatically
        newContainer = document.createElement('div');
        newContainer.classList.add('transparent-container');

        const timerWrapper = document.createElement('div');
        timerWrapper.classList.add('timer-wrapper');

        // Title
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Timer Name';
        titleInput.classList.add('timer-title');
        titleDiv.appendChild(titleInput);

        // Timer display
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer');
        const units = ['Days', 'Hours', 'Minutes', 'Seconds'];
        units.forEach(unit => {
            const timeUnit = document.createElement('div');
            timeUnit.classList.add('time-unit');
            const valueSpan = document.createElement('span');
            valueSpan.classList.add(unit.toLowerCase());
            valueSpan.textContent = '00';
            const labelSpan = document.createElement('span');
            labelSpan.textContent = unit;
            timeUnit.appendChild(valueSpan);
            timeUnit.appendChild(labelSpan);
            timerDiv.appendChild(timeUnit);
        });

        // Input container
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('date-input');
        dateDiv.appendChild(dateInput);
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.classList.add('time-input');
        timeDiv.appendChild(timeInput);
        inputContainer.appendChild(dateDiv);
        inputContainer.appendChild(timeDiv);

        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const startBtn = document.createElement('button');
        startBtn.classList.add('button', 'start-btn');
        startBtn.textContent = 'Start';
        const stopBtn = document.createElement('button');
        stopBtn.classList.add('button', 'stop-btn');
        stopBtn.textContent = 'Stop';
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('button', 'reset-btn');
        resetBtn.textContent = 'Reset';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '🗑️';
        buttonContainer.appendChild(startBtn);
        buttonContainer.appendChild(stopBtn);
        buttonContainer.appendChild(resetBtn);
        buttonContainer.appendChild(deleteBtn);

        // Message
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        // Assemble timer wrapper
        timerWrapper.appendChild(titleDiv);
        timerWrapper.appendChild(timerDiv);
        timerWrapper.appendChild(inputContainer);
        timerWrapper.appendChild(buttonContainer);
        timerWrapper.appendChild(messageDiv);

        newContainer.appendChild(timerWrapper);
    }

    const newWrapper = newContainer.querySelector('.timer-wrapper');
    newWrapper.querySelector('.timer-title').value = '';
    newWrapper.querySelector('.date-input').value = '';
    newWrapper.querySelector('.time-input').value = '';
    updateTimerDisplay(newWrapper, 0, 0, 0, 0);
    newWrapper.classList.remove('running');
    newWrapper.querySelector('.message').textContent = '';

    // Append new container to body
    document.body.insertBefore(newContainer, document.querySelector('.add-timer-btn'));

    // Move add button to the bottom of body
    const addButton = document.querySelector('.add-timer-btn');
    document.body.appendChild(addButton);
    console.log('Add button moved to bottom'); // Debug

    setupTimer(newWrapper);
}

// Initialize the first timer
const firstWrapper = document.querySelector('.timer-wrapper');
setupTimer(firstWrapper);

// Add timer button event
const addButton = document.querySelector('.add-timer-btn');
addButton.addEventListener('click', () => {
    console.log('Add event listener triggered'); // Debug
    addNewTimer();
});