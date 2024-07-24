document.getElementById('convertBtn').addEventListener('click', async function() {
    const fileInput = document.getElementById('videoFile');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        alert('Please upload a video file');
        return;
    }

    const file = fileInput.files[0];
    resultDiv.innerHTML = `<p>Converting...</p>`;

    // Use ffmpeg.js (assuming it's included in your project)
    const ffmpeg = FFmpeg.createFFmpeg({ log: true });
    await ffmpeg.load();

    // Load the video file into ffmpeg
    ffmpeg.FS('writeFile', 'input.mp4', new Uint8Array(await file.arrayBuffer()));

    // Run the conversion command
    await ffmpeg.run('-i', 'input.mp4', 'output.mp3');

    // Retrieve the converted file
    const data = ffmpeg.FS('readFile', 'output.mp3');

    // Create a Blob from the output and generate a download link
    const blob = new Blob([data.buffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    resultDiv.innerHTML = ` 
        <p>Conversion complete!</p>
        <a href="${url}" download="converted_audio.mp3">Download converted_audio.mp3</a>
    `;
});
