const imageContainer = document.getElementById("imageContainer");
const generateBtn = document.getElementById("generateBtn");
const imageCountInput = document.getElementById("imageCount");

const generateImages = () => {
    const imageCount = parseInt(imageCountInput.value);

    // Clear previous images
    imageContainer.innerHTML = "";

    // Generate new images
    for (let i = 0; i < imageCount; i++) {
        const imageItem = document.createElement("div");
        imageItem.classList.add("imageItem");

        const image = document.createElement("img");
        image.src = `https://picsum.photos/300?random=${i}`;
        image.alt = `Image ${i + 1}`;

        // Add image options
        const imageOptions = document.createElement("div");
        imageOptions.classList.add("imageOptions");

        const copyImageOption = document.createElement("div");
        copyImageOption.classList.add("imageOption");
        copyImageOption.textContent = "Copy Image";
        copyImageOption.addEventListener("click", () => {
            copyImage(image.src);
        });

        const copyUrlOption = document.createElement("div");
        copyUrlOption.classList.add("imageOption");
        copyUrlOption.textContent = "Copy URL";
        copyUrlOption.addEventListener("click", () => {
            copyText(image.src);
        });

        imageOptions.appendChild(copyImageOption);
        imageOptions.appendChild(copyUrlOption);

        imageItem.appendChild(image);
        imageItem.appendChild(imageOptions);

        imageContainer.appendChild(imageItem);
    }
};

generateBtn.addEventListener("click", generateImages);

// Function to copy text to clipboard
const copyText = (text) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
};

// Function to copy image to clipboard
const copyImage = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const item = new ClipboardItem({ "image/jpeg": blob });
        await navigator.clipboard.write([item]);
        console.log("Image copied to clipboard successfully.");
    } catch (error) {
        console.error("Error copying image:", error);
    }
};
