chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed!');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started!');
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'checkInternetSpeed') {
        try {
            const response = await fetch('https://api.speedtest.net/v2/speedtest');
            const data = await response.json();
            sendResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            sendResponse({ error: error.message });
        }
        return true; // Indicates that sendResponse will be called asynchronously
    }
});
