function nextStep() {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    
    const selectOption = document.querySelector('input[name="injury-type"]:checked');
    const accidentWithin2Years = document.querySelector('input[name="accident-within-2-years"]:checked');
    const accidentFault = document.querySelector('input[name="accident-fault"]:checked');
    const physicallyInjured = document.querySelector('input[name="physically-injured"]:checked');

    if (selectOption && accidentWithin2Years && accidentFault && physicallyInjured) {
        step1.classList.remove('active');
        step2.classList.add('active');
    } else {
        alert('Please fill out all fields in Step 1.');
    }
}

function selectIcon(element, value) {
    // Remove 'selected' class from all icons
    const icons = document.querySelectorAll('.icon-item');
    icons.forEach(icon => icon.classList.remove('selected'));

    // Add 'selected' class to the clicked icon
    element.classList.add('selected');

    // Set the corresponding radio input to checked
    const radio = document.getElementById(value);
    radio.checked = true;
}

const slider = document.getElementById('pain-slider');
const output = document.getElementById('slider-value');
const outputValueDisplay = document.getElementById('output-value');
const question1 = document.getElementById('medical-expenses');
const question2 = document.getElementById('loss-of-wages');
const question3 = document.getElementById('future-medical-expenses');

// Map the slider values to text labels
const painLevels = {
    1: 'Mild',
    2: 'Medium',
    3: 'Intense'
};

// Display the default slider value
output.textContent = painLevels[slider.value];

slider.oninput = function () {
    output.textContent = painLevels[this.value];
    updateOutputValue();
}

function updateOutputValue() {
    const q1 = parseFloat(question1.value) || 0;
    const q2 = parseFloat(question2.value) || 0;
    const q3 = parseFloat(question3.value) || 0;
    const sliderValue = parseFloat(slider.value);

    const questionsSum = (q1 + q2 + q3) * 1.5;

    let baseMultiplier = 1.5;
    if (sliderValue == 2) {
        baseMultiplier = 2.2;
    } else if (sliderValue == 3) {
        baseMultiplier = 3.3;
    }

    let painMultiplier = 1;
    if (sliderValue == 1) {
        painMultiplier = 1.1; // Mild
    } else if (sliderValue == 2) {
        painMultiplier = 1.5; // Medium
    } else if (sliderValue == 3) {
        painMultiplier = 2.0; // Intense
    }

    const outputValue = questionsSum * baseMultiplier * painMultiplier;
    outputValueDisplay.textContent = outputValue.toFixed(2);
}

function updateSliderValue() {
    const value = slider.value;
    output.textContent = painLevels[value];
    updateOutputValue();
}

// Add event listeners
slider.addEventListener('input', updateSliderValue);
question1.addEventListener('input', updateOutputValue);
question2.addEventListener('input', updateOutputValue);
question3.addEventListener('input', updateOutputValue);

// Initial call to set default values
updateSliderValue();
updateOutputValue();
