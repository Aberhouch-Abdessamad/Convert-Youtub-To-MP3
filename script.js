document.getElementById('convertBtn').addEventListener('click', function() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    if (!youtubeUrl) {
        alert('Please enter a YouTube URL');
        return;
    }

    // Create a FormData object to handle the POST request
    const formData = new FormData();
    formData.append('url', youtubeUrl);

    // Use the provided API endpoint for conversion
    fetch('https://ytmp3.cc/qwqR/@api/json/mp3/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok' && data.mp3) {
            const downloadLink = document.createElement('a');
            downloadLink.href = data.mp3;
            downloadLink.textContent = 'Download MP3';
            downloadLink.target = '_blank';
            document.getElementById('result').innerHTML = '';
            document.getElementById('result').appendChild(downloadLink);
        } else {
            document.getElementById('result').textContent = 'Error converting video';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error converting video';
    });
});
