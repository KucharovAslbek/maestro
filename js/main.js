import { videoPlayer } from './modules/video.js';
import { audioPlayer } from './modules/audio.js';
import { radioPlayer } from './modules/radio.js';

videoPlayer();
audioPlayer();
radioPlayer();

let tabBtns = document.querySelectorAll('.tabs__btn'),
    tabContent = document.querySelectorAll('.tab__content');
let tabName;

tabBtns.forEach( item => {
    item.addEventListener('click', selectedTab);
})

function selectedTab(){
    tabBtns.forEach( item => {
        item.classList.remove('active');
    })
    this.classList.add('active');
    tabName = this.getAttribute('data-content');
    selectedTabContent(tabName);
    deactivatePlayer();
}

function selectedTabContent(arg){
    tabContent.forEach( elem => {
        elem.classList.contains(arg) ? elem.classList.add('tab__content--active') : elem.classList.remove('tab__content--active');
    })
}

function deactivatePlayer() {
    audioPlayer.stop();
    videoPlayer.stop();
}