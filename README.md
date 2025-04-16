# Overview

This is a web-based Countdown Timer application built with HTML, CSS, and JavaScript. It allows users to create multiple timers, set target dates and times, and manage them with start, 
stop, reset, and delete functionalities. The application features a sleek, modern design with a responsive layout and audio notifications when timers complete.

# Features

Multiple Timers: Add and manage multiple countdown timers simultaneously.

Customizable Timer Names: Assign names to each timer for easy identification.

Countdown Display: Shows days, hours, minutes, and seconds remaining.

Controls: Start, stop, reset, and delete timers with intuitive buttons.

Audio Notification: Plays a beep sound (3 times with a 500ms delay) when a timer reaches zero.

Responsive Design: Adapts to various screen sizes, including mobile devices.

Visual Feedback: Displays messages for actions like pausing, resetting, or invalid inputs.

Modern Styling: Uses a glassmorphism-inspired design with a blurred background and smooth animations.

# File Structure

index.html: The main HTML file containing the structure of the application.

styles.css: Contains all CSS styles, including variables, responsive design, and animations.

script.js: Handles the timer logic, event listeners, and dynamic DOM manipulation.

assets/:
BG.jpg: Background image for the application.
beep.mp3: Audio file for timer completion notification.



# Setup and Installation

Clone or Download: Download the project files to your local machine.
Host Locally:
Place all files in a web server directory (e.g., using XAMPP, WAMP, or a simple HTTP server).
Alternatively, use a tool like Live Server in VS Code to serve the files.


Open in Browser: Open index.html in a modern web browser (Chrome, Firefox, Edge, etc.).
Ensure Assets:
Make sure the assets folder is in the same directory as index.html.
Verify that beep.mp3 are present in the assets folder.



# Usage

Set a Timer:
Enter a name for the timer (optional) in the "Timer Name" input field.
Select a target date and time using the date and time inputs.
Click the "Start" button to begin the countdown.


Manage Timers:
Stop: Pause the countdown.
Reset: Clear the timer and inputs, resetting to zero.
Delete: Remove the timer from the page.


Add New Timer:
Click the "+" button at the bottom to create a new timer.
The new timer will appear above the "+" button.


Notifications:
If the date/time is invalid or in the past, a message will appear.
When a timer reaches zero, a "Time’s Up!" message is shown, and the beep sound plays.



## Technical Details

HTML:
Uses semantic HTML5 with a single-page structure.

CSS:
Utilizes CSS variables for consistent theming.
Implements glassmorphism with backdrop-filter: blur.
Includes responsive design with media queries for smaller screens.
Features animations like fadeIn and pulse for visual feedback.

JavaScript:
Manages timer logic with setInterval for real-time updates.
Handles dynamic creation of timers via DOM manipulation.
Includes a utility to play the beep sound multiple times with delays.
Stores timer state (e.g., interval IDs) to prevent conflicts.


# Dependencies:

Google Fonts: Poppins (loaded via CDN).
No external JavaScript libraries; pure vanilla JavaScript.



# Known Limitations

Past Dates: If a target time is in the past, the timer counts down to zero immediately with a warning message.

Audio Playback: Audio may fail to play in some browsers due to autoplay restrictions; errors are logged to the console.

Browser Compatibility: Best supported in modern browsers. Some older browsers may not support backdrop-filter or certain input types.

# Future Improvements

Add persistent storage (e.g., localStorage) to save timers across sessions.

Allow customization of timer sounds or themes.

Implement a snooze feature for completed timers.

Enhance accessibility with ARIA attributes and keyboard navigation.

