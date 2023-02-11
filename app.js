/**
 * 1. Render songs
 * 2. scroll top
 * 3. play/ pause/ seek
 * 4. cd rotate
 * 5. next/ prev
 * 6. random
 * 7. next/ repeat when ended
 * 8. active song
 * 9. scroll active song into view
 * 10. play song when click
*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const player = $('.player')
const playlist = $('.playlist')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const audio = $('#audio')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const progress = $('#progress')
const repeatBtn = $('.btn-repeat')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')


const app ={
    currentIndex: 0,//get first index of array
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Như Anh Đã Thấy Em",
            singer: "Phuc XP x Freak-D",
            path: "./music/song1.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/a/9/b/6/a9b681761823c121118855e0b0b7d9d7.jpg"
        },
        {
            name: "Thiên Thần Tình Yêu",
            singer: "Ricky Star, T.R.I",
            path: "./music/song2.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/1/1/0/8110f74b9ee4cdc34fc7da051936c465.jpg"
        },
        {
            name: "3107(Cover)",
            singer: "Music 30-365",
            path: "./music/song3.mp3",
            image: "https://photo-playlist-zmp3.zmdcdn.me/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqPu401LMcs7HcKvU0W7EOTlB60zJLfyqYSjD3W5SdcVJbniB30tFPe6D5KyD0OaqYiPN1ZuQZZYzm1nRT0t3TFhHN4a-HyCf-j1S52b7rNkZsrCHUqo5V_BLL1DzJjryeDPRGtjBZdxnXWu9S5ZPShVK7Kua3eyjxPCEH34TbbwrnKDrTqcE&cv=1&size=thumb/240_240"
        },
        {
            name: "Thu Cuối",
            singer: "Yanbi x Mr T x Hằng Bingboong",
            path: "./music/song4.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_png/avatars/8/e/8e02a864575266866ce9ab90731747bc_1455449226.png"
        },
        {
            name: "Tình Yêu Màu Nắng",
            singer: "Đoàn Thúy Trang x BigDaddy",
            path: "./music/song5.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_png/covers/d/a/dacab76fe473d64942d2036ccebb1b0d_1427779844.png"
        },
        {
            name: "Chờ Đợi Có Đáng Sợ",
            singer: "Andiez",
            path: "./music/song6.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/1/5/e/515e8d82b5d816639e0bb8fd1fbc9c00.jpg"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "MONSTAR",
            path: "./music/song7.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg"
        },
        {
            name: "Mashup Nevada x Đi Đi Đi",
            singer: "K-ICM x T-ICM x Zickky x Kelsey",
            path: "./music/song8.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg"
        },
        {
            name: "Summertime",
            singer: "K-391",
            path: "./music/song9.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/8/2/9/9/82998293f8c34d7999339490d0b90118.jpg"
        },
        {
            name: "Tada koe hitotsu",
            singer: "Rokudenashi",
            path: "./music/song10.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
        },
        {
            name: "Lemon",
            singer: "Kobasolo & Harutya",
            path: "./music/song11.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/5/b/0/4/5b042516d7bc2120c4095d4de45974a5.jpg"
        },
        {
            name: "Sakura",
            singer: "Ikimonogakari",
            path: "./music/song12.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/7/2/8/0/728078e0f01a754a1abd1937e08e1ee5.jpg"
        },
        {
            name: "Hazy Moon",
            singer: "Hatsune Miku",
            path: "./music/song13.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/9/9/b/6/99b6bc92ae1c3c0210523b9fdf0aaf9d.jpg"
        }, 
        {
            name: "Cực Giống Rồi / 像极了",
            singer: "Vĩnh Bân Ryan.B",
            path: "./music/song14.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/0/9/7/e0973b954d6fc3a8a1c7a78e63477360.jpg"
        }
    ],
    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ""}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        const cdWidth = cd.offsetWidth
        //CD rotate
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,//10 seconds
            iterations: Infinity
        })

        cdThumbAnimate.pause()
        //zoom in / zoom out cd
        document.onscroll = function(){            
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //when click play button
        playBtn.onclick = function(){
            if(!app.isPlaying){
                audio.play()
            } else{
                audio.pause()
            }
        }
        //when play song
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //when pause song
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        //when changes song tempo
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        //when rewind song
        progress.onchange = function(e){
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        //when next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            } else{
                app.nextSong()                
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }
        //when prev song
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            } else{
                app.prevSong()                
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }
        //handle on/off button random song
        randomBtn.onclick = function(){
            if(app.isRandom){
                app.isRandom = false
                this.classList.remove('active')
            }else{
                app.isRandom = true
                this.classList.add('active')
            }
        }
        //hanlde on/off button repeat
        repeatBtn.onclick = function(){
            if(app.isRepeat){
                app.isRepeat = false
                this.classList.remove('active')
            }else{
                app.isRepeat = true
                this.classList.add('active')
            }

        }
        //handle next/ repeat song when the audio ended
        audio.onended = function(){
            if(app.isRepeat){
                audio.play()
            } else{
                nextBtn.click()
            }
        }
        //handle click into playlist
        playlist.onclick = function(e){    
            const songNode = e.target.closest('.song:not(.active)')       
            if( songNode || e.target.closest('.option')){
                //handle when click song
                if(songNode){
                    app.currentIndex = Number(songNode.dataset.index) //convert string to number
                    app.loadCurrentSong()
                    audio.play()
                    app.render()
                }
                //handle when click song option
                if(e.target.closest('.option')){
                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url:('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function(){
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: "smooth", 
                block: "center", 
                inline: "nearest"})
        }, 100)
    },
    start: function(){
        //define properties for project
        this.defineProperties()
        //listen / handle events
        this.handleEvents()
        //load the first song info into the UI when the app loads
        this.loadCurrentSong()
        //Render playlist
        this.render()
    }


}

app.start()