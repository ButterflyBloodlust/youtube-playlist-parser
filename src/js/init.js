function processInput(input) {
    const ytIDLength = 11
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi
    let videoIDs = []
    let m;
    let vidIdsErrorNum = 0;
    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                if (match.length === ytIDLength)
                    videoIDs.push(match);
                else {
                    vidIdsErrorNum++;
                }
            }
        });
    }
    if (videoIDs.length > 0) {
        var playlistUrl = 'https://www.youtube.com/watch_videos?video_ids=' + videoIDs.join(',');
        document.getElementById('playlist-url').href = playlistUrl;
        document.getElementById('playlist-url').text = playlistUrl;
    } else {
        document.getElementById('playlist-url').text = 'waiting for proper input...';
        document.getElementById('playlist-url').removeAttribute('href');
    }

    if (vidIdsErrorNum > 0) {
        document.getElementById('vid-id-error').style.display = 'unset';
        document.getElementById('vid-id-error-num').innerText = vidIdsErrorNum;
    } else {
        document.getElementById('vid-id-error').style.display = 'none';
    }
};

document.getElementById('yt-vid-urls').oninput = (event) => processInput(event.target.value);

processInput(document.getElementsByTagName('textarea')[0].value);
