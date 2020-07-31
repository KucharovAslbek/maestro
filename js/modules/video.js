export let videoPlayer = () => {
    let videoPlayerWindow = document.querySelector('.video-player');
    let videoButtonPlay = document.querySelector('.video-button__play');
    let videoButtonStop = document.querySelector('.video-button__stop');
    let videoPassedTime = document.querySelector('.video-time__passed');
    let videoProgress = document.querySelector('.video-progress');
    let videoVolume = document.querySelector('.video_volume');
    let videoVolumeUpBtn = document.querySelector('.video_volume_up');
    let fullScreenVideo = document.querySelector('.fullscreen_video');
    let videoTotalTime = document.querySelector('.video-time__total');
    
    function toggleIcon(){
        if(videoPlayerWindow.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
            videoButtonPlay.classList.remove('clicked');
            videoButtonPlay.classList.add('button');
        }else{
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.remove('button');
            videoButtonPlay.classList.add('clicked');
        }
    }

    function togglePlay(){
        if(videoPlayerWindow.paused){
            videoPlayerWindow.play();
        }else{
            videoPlayerWindow.pause();
        }
    }

    function stopPlay(){
        videoPlayerWindow.pause();
        videoPlayerWindow.currentTime = 0;
    } 

    let addZero = n => n < 10 ? '0' + n : n;

    videoPlayerWindow.addEventListener('click', togglePlay);   
    videoButtonPlay.addEventListener('click', togglePlay);
    
    videoPlayerWindow.addEventListener('play', toggleIcon);
    videoPlayerWindow.addEventListener('pause', toggleIcon);
    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayerWindow.addEventListener('timeupdate', () => {
        let currentTime = videoPlayerWindow.currentTime;
        let duration = videoPlayerWindow.duration;

        videoProgress.value = (currentTime/duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);
        
        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration   % 60);

        videoPassedTime.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTotalTime.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    });

    videoProgress.addEventListener('change', () => {
        let duration = videoPlayerWindow.duration;
        let value = videoProgress.value;

        videoPlayerWindow.currentTime = (value * duration) / 100;
    })


    videoVolume.addEventListener('input', () => {
        videoPlayerWindow.volume = videoVolume.value / 100;
        console.log(videoVolume.value);
        if(videoVolume.value == 0){
            videoVolumeUpBtn.classList.remove('fa-volume-up');
            videoVolumeUpBtn.classList.remove('volume_on');
            videoVolumeUpBtn.classList.add('fa-volume-off');
        }else{
            videoVolumeUpBtn.classList.add('fa-volume-up');
            videoVolumeUpBtn.classList.add('volume_on');
            videoVolumeUpBtn.classList.remove('fa-volume-off');
        }
    });

    videoVolumeUpBtn.addEventListener('click', () => {
        if(videoPlayerWindow.volume == 0){
            videoPlayerWindow.volume = 1;
            videoVolumeUpBtn.classList.add('fa-volume-up');
            videoVolumeUpBtn.classList.add('volume_on');
            videoVolumeUpBtn.classList.remove('fa-volume-off');
        }else{
            videoPlayerWindow.volume = 0;
            videoVolumeUpBtn.classList.remove('fa-volume-up');
            videoVolumeUpBtn.classList.remove('volume_on');
            videoVolumeUpBtn.classList.add('fa-volume-off');
        }
    });

    fullScreenVideo.addEventListener('click', () => {
        videoPlayerWindow.requestFullscreen();
    });

    videoPlayer.stop = () => {
        if(!videoPlayerWindow.paused){
            videoPlayerWindow.pause();    
            videoButtonPlay.classList.toggle('fa-play');
            videoButtonPlay.classList.toggle('fa-pause');
        }
    };

};