const pickerBtn = document.getElementById('pickbtn');
const colorList = document.getElementById('color-list');
const recentColorHeading = document.getElementById('recentColorHeading');

const colorData = JSON.parse(localStorage.getItem('colorData')) || [];

// Function to update the localStorage with current colorData
const saveToLocalStorage = () => {
    localStorage.setItem('colorData', JSON.stringify(colorData));
}

const colorPicker = () => {
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((res) => {
        if (colorData.length >= 8) {
            colorData.shift(); // Remove the oldest color
        }
        colorData.push(res.sRGBHex);
        saveToLocalStorage(); // Save updated data to localStorage
        updateColorList(); // Update the list after adding new color
    });
}

const updateColorList = () => {
    colorList.innerHTML = ''; // Clear the list
    colorData.slice().reverse().forEach((item) => {
        const li = document.createElement('li');
        li.className = 'listColor';
        const span = document.createElement('span');
        span.classList.add('colorBox');
        span.style.backgroundColor = item;
        span.addEventListener('click', () => copyToClipboard(item, li));
        li.appendChild(span);
        li.appendChild(document.createTextNode(item));
        colorList.appendChild(li);
    });
}

const copyToClipboard = async (text, element) => {
    try {
        await navigator.clipboard.writeText(text);
        element.innerHTML = 'copied!';
        setTimeout(() => {
            element.innerHTML = text;
        }, 1000);
    } catch (error) {
        console.error('Failed to copy:', error);
    }
}

pickerBtn.addEventListener('click', () => {
    colorPicker();
});

// Initialize the color list with stored data on page load
document.addEventListener('DOMContentLoaded', () => {
    updateColorList();
});
