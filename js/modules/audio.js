export let audioPlayer = () => {

    let audioPlayerTap = document.querySelector('.audio-player');
    let audioControls = document.querySelector('.audio_controls');
    let audioLayer = document.querySelector('.audio__layer');
    let audioName = document.querySelector('.audio_name');
    let audioRepeatButton = document.querySelector('.audio_repeat_btn');
    let audioPreviousButton = document.querySelector('.audio_prev_btn');
    let audioPlayButton = document.querySelector('.audio_play_btn');
    let audioNextButton = document.querySelector('.audio_next_btn');
    let audioTimePassed = document.querySelector('.audio-time__passed');
    let audioProgress = document.querySelector('.audio_progress');
    let audioTimeTotal = document.querySelector('.audio-time__total');
    let audioVolumeProgress = document.querySelector('.audio_volume');
    let audioVolumeUp = document.querySelector('.audio_volume_up');

    let tracks = ['ThenX - Choosen', 'Foster the People - Pumped Up Kicks', 'Imagine Dragons - Whatever it takes'];
    let trackNumber = 0;
    audioLayer.src = `./audio/${tracks[0]}.jpg`;
    audioName.textContent = 'ThenX - Choosen';
    audioPlayerTap.src = `./audio/${tracks[0]}.mp3`;


    function loadTrack(){
        let isPlayed = audioPlayerTap.paused;
        let track = tracks[trackNumber];
        audioLayer.src = `./audio/${track}.jpg`;
        audioName.textContent = track;
        audioPlayerTap.src = `./audio/${track}.mp3`;

        if(isPlayed){
            audioPlayerTap.pause();
        }else{
            audioPlayerTap.play();
        }
    }

    function prevTrack(){
        if(trackNumber != 0){
            trackNumber--;
        }else{
            trackNumber = tracks.length - 1;
        }
        loadTrack();
    };

    function nextTrack(){
        if(trackNumber === tracks.length - 1){
            trackNumber = 0;
        }else{
            trackNumber++;
        }
        loadTrack();
    };

    let addZero = n => {
        return n < 10 ? '0' + n : n;
    }

    audioControls.addEventListener('click', event => {
        let target = event.target;

        if(target.classList.contains('audio_play_btn')){
            audioPlayButton.classList.toggle('fa-play');
            audioPlayButton.classList.toggle('fa-pause');
            audioPlayButton.classList.toggle('clicked');

            if(audioPlayerTap.paused){
                audioPlayerTap.play();
            }else{
                audioPlayerTap.pause();
            }
        }
        if(target.classList.contains('audio_prev_btn')){
            prevTrack();
        }
        if(target.classList.contains('audio_next_btn')){
            nextTrack();
        }

    });

    audioPlayerTap.addEventListener('ended', () => {
        nextTrack();
        audioPlayerTap.play();
    });

    audioPlayerTap.addEventListener('timeupdate', () => {
        let duration = audioPlayerTap.duration;
        let currentTime = audioPlayerTap.currentTime;
        let progress = (currentTime / duration) * 100;

        audioProgress.value = progress;

        let minutesPassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minutesTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
        

    });

    audioProgress.addEventListener('click', event => {
        let xCoordinate = event.offsetX;
        let progressWidth = audioProgress.clientWidth;
        let progressBar = (xCoordinate / progressWidth) * audioPlayerTap.duration;
        audioPlayerTap.currentTime = progressBar;
    });

    audioRepeatButton.addEventListener('click', () => {
        if(audioPlayerTap.loop === false){
            audioPlayerTap.loop = true;
        }else{
            audioPlayerTap.loop = false;
        }
        audioRepeatButton.classList.toggle('clicked');
    });

    audioVolumeProgress.addEventListener('input', () => {
        audioPlayerTap.volume = audioVolumeProgress.value / 100;
        console.log(audioVolumeProgress.value);
        if(audioVolumeProgress.value == 0){
            audioVolumeUp.classList.remove('fa-volume-up');
            audioVolumeUp.classList.remove('volume_on');
            audioVolumeUp.classList.add('fa-volume-off');
        }else{
            audioVolumeUp.classList.add('fa-volume-up');
            audioVolumeUp.classList.add('volume_on');
            audioVolumeUp.classList.remove('fa-volume-off');
        }
    });

    audioVolumeUp.addEventListener('click', () => {
        if(audioPlayerTap.volume == 0){
            audioPlayerTap.volume = 1;
            audioVolumeUp.classList.add('fa-volume-up');
            audioVolumeUp.classList.add('volume_on');
            audioVolumeUp.classList.remove('fa-volume-off');
        }else{
            audioPlayerTap.volume = 0;
            audioVolumeUp.classList.remove('fa-volume-up');
            audioVolumeUp.classList.remove('volume_on');
            audioVolumeUp.classList.add('fa-volume-off');
        }
    }); 
    
    audioPlayer.stop = () => {
        if(!audioPlayerTap.paused){
            audioPlayerTap.pause();
            audioPlayButton.classList.toggle('fa-play');
            audioPlayButton.classList.toggle('fa-pause');
        }
    };

};