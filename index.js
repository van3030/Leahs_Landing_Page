const hamburgerBtn = document.querySelector('.hamburger-svg');
const meNu = document.querySelector('.menu');
const closeBtn = document.querySelector('.menu-close-btn');

function removeMenu() {

  window.addEventListener('scroll', (e) => {

    meNu.classList.remove('active');

  })

}

hamburgerBtn.addEventListener('click', (event) => {

  event.stopPropagation();
  meNu.classList.toggle('active');

  });

document.addEventListener('click', (event) => {
  
  if (meNu.classList.contains('active') && !meNu.contains(event.target)) {
    meNu.classList.remove('active');
    removeMenu();
  }
});

closeBtn.addEventListener('click', (e) => {

  e.stopPropagation();
  meNu.classList.remove('active');


});



const music = new Audio('./audio/leniGarret.mp3');
music.loop = true;
music.volume = 0.1;

const savedTime = localStorage.getItem('bgMusicTime');
if (savedTime) {
  music.currentTime = parseFloat(savedTime);
}

music.addEventListener('timeupdate', () => {
  localStorage.setItem('bgMusicTime', music.currentTime);
});

function startAudioOnInteraction() {
  music.play().then(() => {
    window.removeEventListener('click', startAudioOnInteraction);
    window.removeEventListener('scroll', startAudioOnInteraction);
  }).catch((error) => {
    console.log("Autoplay prevented:", error);
  });
}

window.addEventListener('click', startAudioOnInteraction);
window.addEventListener('scroll', startAudioOnInteraction);



const musicBtn = document.querySelector('.music-toggle');
const navMusicBtn = document.querySelector('.nav-music-toggle');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');
const navMusicIconOn = document.getElementById('nav-musicIconOn');
const navMusicIconOff = document.getElementById('nav-musicIconOff');

function pauseBtn(e) {
  e.stopPropagation(); 

  if (!music.paused) {
    // If playing -> pause it
    music.pause();
    if (musicIconOn && musicIconOff) {
      musicIconOn.classList.add('hidden');
      musicIconOff.classList.remove('hidden');
    }
  } else {
    // If paused -> play it
    music.play().then(() => {
      if (musicIconOn && musicIconOff) {
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
      }
    }).catch((err) => console.log("Playback error:", err));
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', pauseBtn);
}

function navPauseBtn(e) {
  e.stopPropagation();

  if (!music.paused) {
    // If playing -> pause it
    music.pause();
    if (navMusicIconOn && navMusicIconOff) {
      navMusicIconOn.classList.add('hidden');
      navMusicIconOff.classList.remove('hidden');
    }
  } else {
    // If paused -> play it
    music.play().then(() => {
      if (navMusicIconOn && navMusicIconOff) {
        navMusicIconOn.classList.remove('hidden');
        navMusicIconOff.classList.add('hidden');
      }
    }).catch((err) => console.log("Playback error:", err));
  }
}

if (navMusicBtn) {
  navMusicBtn.addEventListener('click', navPauseBtn);
}