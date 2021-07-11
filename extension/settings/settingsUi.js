const initUi = () => {
    //console.log('settings')
    const optionsList = document.querySelector('div > div > div > ul');
    const shuffle = document.createElement('li');
    const shuffleText = document.createElement('p');
    const shuffleCheckSlider = document.createElement('button');
    const shuffleCheckSwitch = document.createElement('span');
    shuffleCheckSlider.role = "switch";
    shuffleCheckSlider.tabIndex = 0;
    shuffleCheckSwitch.ariaHidden = "true";
    //shuffleCheck.type = 'checkbox';
    shuffleCheckSlider.id = "shuffleCheckbox"
    shuffleCheckSlider.appendChild(shuffleCheckSwitch);
    toggleOff(shuffleCheckSlider);
    //shuffleCheck.className = "border-gray-300 bg-gray-200"
    shuffle.className = "py-4 flex items-center justify-between";
    shuffleText.className = "text-sm font-medium text-gray-500 dark:text-gray-300";
    shuffleText.appendChild(document.createTextNode("Randomize rows of Problem Lists"));
    shuffle.appendChild(shuffleText);
    shuffle.appendChild(shuffleCheckSlider);
    optionsList.appendChild(shuffle);

    const turnOff = document.createElement('li');
    const turnOffText = document.createElement('p');
    const turnOffSlider = document.createElement('button');
    const turnOffSwitch = document.createElement('span');
    turnOffSlider.role = 'switch';
    turnOffSlider.tabIndex = 0;
    turnOffSwitch.ariaHidden = 'true';
    turnOffSlider.id = 'onOffSwitch';
    turnOffSlider.appendChild(turnOffSwitch);
    toggleOff(turnOffSlider);
    turnOff.className = "py-4 flex items-center justify-between";
    turnOffText.className = "text-sm font-medium text-gray-500 dark:text-gray-300";
    turnOffText.appendChild(document.createTextNode("Hide Ratings and Quality"));
    turnOff.appendChild(turnOffText);
    turnOff.appendChild(turnOffSlider);
    optionsList.appendChild(turnOff);
    
    const avgMed = document.createElement('li');
    avgMed.className = "py-4";
    const avgLabel = document.createElement('label');
    avgLabel.className = "block mb-4 text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-4 items-center"
    const avgLabelText = document.createElement("span");
    avgLabelText.appendChild(document.createTextNode('Use average for Rating and Quality'));
    const avg = document.createElement('input');
    avg.type = "radio";
    avg.name = "avgmed";
    avg.className = "border-gray-300"
    avg.id = "avg";
    avgLabel.appendChild(avg);
    avgLabel.appendChild(avgLabelText);
    const med = document.createElement("input");
    const medLabel = document.createElement("label");
    medLabel.className = "block text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-4 items-center"
    const medLabelText = document.createElement("span");
    medLabelText.appendChild(document.createTextNode("Use median for Rating and Quality"));
    med.type = "radio";
    med.name = "avgmed";
    med.className = "border-gray-300"
    med.id = "med";
    medLabel.appendChild(med);
    medLabel.appendChild(medLabelText);
    avgMed.appendChild(avgLabel);
    avgMed.appendChild(medLabel);
    optionsList.append(avgMed);
}