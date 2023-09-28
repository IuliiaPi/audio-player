import playList from './playList.js';
console.log(playList);


const backgroundImage = document.querySelector('.background-image');
const image = document.querySelector('.image');
const audioSinger = document.querySelector('.audio__singer');
const audioTitle = document.querySelector('.audio__title');
const trackDuration = document.querySelector('.track-duration');

const btnPlay = document.querySelector('.play');
const btnPlayPrev = document.querySelector('.play-prev');
const btnPlayNext = document.querySelector('.play-next');

// player  

const audio = new Audio(playList);
let isPlay = false;
let playNum = 0;

function changeTrackContent() {
    backgroundImage.style.backgroundImage = `url(${playList[playNum].image})`;
    image.style.backgroundImage = `url(${playList[playNum].image})`;
    audioSinger.textContent = `${playList[playNum].singer}`;
    audioTitle.textContent = `${playList[playNum].title}`;
    // trackDuration.textContent = `${playList[playNum].duration}`;

    audio.addEventListener('loadedmetadata', () => {
        const minutesDuration = Math.floor(audio.duration / 60);
        const secondsDuration = Math.floor(audio.duration % 60);
        trackDuration.innerHTML = `${minutesDuration}:${secondsDuration}`;
    });
}
changeTrackContent();

function toggleBtn() {
    btnPlay.classList.toggle('pause');
    playAudio();
}
btnPlay.addEventListener('click', toggleBtn);

function playAudio() {
    if (!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
}

function getPlayNext() {
    isPlay = false;
    if (playNum === playList.length - 1) {
        playNum = 0;
    } else {
        playNum++;
    }
    btnPlay.classList.add('pause');
    playAudio();
    changeTrackContent();
}

btnPlayNext.addEventListener("click", getPlayNext);

function getPlayPrev() {
    isPlay = false;
    if (playNum === 0) {
        playNum = playList.length - 1;
    } else {
        playNum--;
    }
    btnPlay.classList.add('pause');
    playAudio();
    changeTrackContent();
}

btnPlayPrev.addEventListener("click", getPlayPrev);

audio.addEventListener('ended', getPlayNext);


// progress-bar

const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current-time');

function getCurrentTrackTime() {
    let minutesCurrent = Math.floor(audio.currentTime / 60);
    if (minutesCurrent < 10) {
        minutesCurrent = `0${minutesCurrent}`;
    }

    let secondsCurrent = Math.floor(audio.currentTime % 60);
    if (secondsCurrent < 10) {
        secondsCurrent = `0${secondsCurrent}`;
    }
    
    currentTime.innerHTML = `${minutesCurrent}:${secondsCurrent}`;
}

function updateProgress(event) {
    const durationTrack = event.srcElement.duration;
    const currentTimeTrack = event.srcElement.currentTime;
    const progressAudio = (currentTimeTrack / durationTrack) * 100;

    progressBar.style.width = `${progressAudio}%`;
    getCurrentTrackTime();
};

audio.addEventListener('timeupdate', updateProgress);

function rewindAudio(event) {
    const width = event.target.clientWidth;
    const clickWidth = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickWidth / width) * duration;
};

progressBarContainer.addEventListener('click', rewindAudio);
