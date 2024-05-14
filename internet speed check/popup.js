document.getElementById('checkSpeedBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'checkInternetSpeed' }, (response) => {
        if (response.error) {
            console.error('Error checking internet speed:', response.error);
            document.getElementById('speed').textContent = 'Error checking internet speed';
        } else {
            const downloadSpeed = response.result.download.bandwidth;
            const uploadSpeed = response.result.upload.bandwidth;
            const unit = response.result.download.bytes;
            document.getElementById('speed').textContent = `Download Speed: ${downloadSpeed} ${unit}/s | Upload Speed: ${uploadSpeed} ${unit}/s`;
        }
    });
});
