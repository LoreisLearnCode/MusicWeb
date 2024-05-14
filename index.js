const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");
musicList = document.getElementById("music-list");

const music = new Audio();

const songs = [
  {
    path: "assets/1.mp3",
    displayName: "Có Hẹn Với Thanh Xuân",
    cover: "assets/1.jpg",
    artist: '"GREY D và Monstar"',
  },
  {
    path: "assets/2.mp3",
    displayName: "Đi Theo Bóng Mặt Trời",
    cover: "assets/2.jpg",
    artist: `"Đen"`,
  },
  {
    path: "assets/3.mp3",
    displayName: "Đôi Mình",
    cover: "assets/3.jpg",
    artist: `"Chuột Sấm Sét"`,
  },
  {
    path: "assets/4.mp3",
    displayName: "Ta Cứ Đi Cùng Nhau",
    cover: "assets/4.jpg",
    artist: `"Đen ft. Linh Cáo"`,
  },
  {
    path: "assets/5.mp3",
    displayName: "Cho Tôi Lang Thang",
    cover: "assets/5.jpg",
    artist: `"Ngọt và Đen"`,
  },
  {
    path: "assets/6.mp3",
    displayName: "Có Một Mùa Hè",
    cover: "assets/6.jpg",
    artist: `"Phạm Toàn Thắng"`,
  },
  {
    path: "assets/7.mp3",
    displayName: "Đường Tôi Chở Em Về",
    cover: "assets/7.jpg",
    artist: `"Bùi Trường Linh"`,
  },
  {
    path: "assets/8.mp3",
    displayName: "Ghé Qua",
    cover: "assets/8.jpg",
    artist: `"Taynguyensound và tofutns"`,
  },
  {
    path: "assets/9.mp3",
    displayName: "Nhắm Mắt Thấy Mùa Hè",
    cover: "assets/9.jpg",
    artist: `"Nguyên Hà"`,
  },
];
let musicIndex = 0;
let isPlaying = false;
let currentPlaybackSpeed = 1; // Tốc độ mặc định là 1x

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
  music.playbackRate = currentPlaybackSpeed; // Cập nhật tốc độ phát nhạc
}

function playMusic() {
  isPlaying = true;
  //Thay doi icon nut play
  playBtn.classList.replace("fa-play", "fa-pause");
  //dat nut nhan tieu de
  playBtn.setAttribute("title", "Pause");

  music.play();
}

function pauseMusic() {
  isPlaying = false;
  //Thay doi icon nut pause
  playBtn.classList.replace("fa-pause", "fa-play");
  //dat nut nhan tieu de
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
  music.playbackRate = currentPlaybackSpeed; // Sử dụng tốc độ phát nhạc hiện tại cho bài mới
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}
// function displayMusicList() {
//   songs.forEach((song, index) => {
//     const songItem = document.createElement("h3");
//     songItem.textContent = `${song.displayName} - ${song.artist}`;
//     songItem.addEventListener("click", () => {
//       musicIndex = index;
//       loadMusic(songs[musicIndex]);
//       playMusic();
//     });
//     musicList.appendChild(songItem);
//   });
// }
loadMusic(songs[musicIndex]);

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

// Get reference to the speed bar and speed options
const speedBar = document.getElementById("speed-bar");
const speedOptions = document.querySelectorAll(".speed-option");

speedOptions.forEach((option) => {
  option.addEventListener("click", function () {
    speedOptions.forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");
    currentPlaybackSpeed = parseFloat(this.dataset.speed); // Lưu trữ tốc độ phát nhạc hiện tại
    music.playbackRate = currentPlaybackSpeed; // Cập nhật tốc độ phát nhạc
  });
});

// // Hiển thị danh sách bài hát ra màn hình
// displayMusicList();
