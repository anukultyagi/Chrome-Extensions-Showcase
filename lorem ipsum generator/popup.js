const output = document.getElementById("output")
const generateBtn = document.getElementById("generateBtn")
const paracount = document.getElementById("paragraphs")

const paraGenerator = async (count) => {
    try {
        count = Math.min(count, 10);
        const response = await fetch(`https://loripsum.net/api/plaintext/prude/long/${count}`)
            .then(response => response.text())


        output.innerHTML = response;
        output.hidden = false;
    } catch (error) {
        console.error("Error fetching data:", error);
        output.innerHTML = "Error fetching data. Please try again later.";
        output.hidden = false;
    }
}

generateBtn.addEventListener("click", () => {
    paraGenerator(paracount.value)

    if (!isNaN(paracount.value)) {
        paraGenerator(paracount.value);
    } else {
        // If the input is not a valid number, show an error message
        output.innerHTML = "Please enter a valid number.";
        output.hidden = false;
    }

})