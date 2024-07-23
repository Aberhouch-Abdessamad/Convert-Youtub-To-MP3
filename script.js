document.getElementById('convertBtn').addEventListener('click', function() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const resultDiv = document.getElementById('result');

    if (!youtubeUrl) {
        alert('Please enter a YouTube URL');
        return;
    }

    // Validate YouTube URL (simple validation)
    if (!youtubeUrl.includes('youtube.com/') && !youtubeUrl.includes('youtu.be/')) {
        alert('Please enter a valid YouTube URL');
        return;
    }

    resultDiv.innerHTML = `
        <p>Converting...</p>
        <div class="progress-bar">
            <span class="progress" style="width: 0%"></span>
        </div>
    `;

    const progressBar = resultDiv.querySelector('.progress');
    let progress = 0;

    // Simulate conversion process
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            
            // Create an empty MP3 file
            const fileName = 'converted_audio.mp3';
            // This array represents the minimal MP3 file structure
            const emptyMp3 = new Uint8Array([
                0xFF, 0xFB, 0x90, 0x44, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ]);
            const blob = new Blob([emptyMp3], {type: 'audio/mpeg'});
            const url = URL.createObjectURL(blob);

            resultDiv.innerHTML = `
                <p>Conversion complete!</p>
                <a href="${url}" download="${fileName}">Download ${fileName}</a>
            `;
        }
    }, 500);
});