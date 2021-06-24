const toggleOff = (toggleButton) => {
    const toggleSpan = toggleButton.firstChild;
    toggleButton.className = 'bg-gray-200 dark:bg-gray-700 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-surface focus:ring-light-blue-500 dark:focus:ring-light-blue-400';
    toggleButton.ariaChecked = "false";
    toggleSpan.className = 'translate-x-0 inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-300 shadow transform ring-0 transition ease-in-out duration-200';
}

const toggleOn = (toggleButton) => {
    const toggleSpan = toggleButton.firstChild;
    toggleButton.className = 'bg-blue-500 dark:bg-blue-600 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-surface focus:ring-light-blue-500 dark:focus:ring-light-blue-400';
    toggleButton.ariaChecked = "true";
    toggleSpan.className = 'translate-x-5 inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-300 shadow transform ring-0 transition ease-in-out duration-200';
}