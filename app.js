/**
 * 1. Render songs
 * 2. scroll top
 * 3. play/ pause/ seek
 * 4. cd rotate
 * 5. next/ prev
 * 6. random
 * 7. next/ repeat when ended
 * 8. active song
 * 9. scroll actiave song into view
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


const app ={
    currentIndex: 0,//lấy ra chỉ mục đầu tiên của mảng
    isPlaying: false,
    songs: [
        {
            name: "Như Anh Đã Thấy Em",
            singer: "Phuc XP x Freak-D",
            path: "https://vnso-zn-10-tf-mp3-320s1-zmp3.zmdcdn.me/7d279c693228db768239/712766342758741409?authen=exp=1675952940~acl=/7d279c693228db768239/*~hmac=1964283464a010800fdf369cd2a9de38&fs=MTY3NTmUsIC4MDE0MDY5Nnx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Nhu-Anh-Da-Thay-Em-PhucXP-Freak-D.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/a/9/b/6/a9b681761823c121118855e0b0b7d9d7.jpg"
        },
        {
            name: "Thiên Thần Tình Yêu",
            singer: "Ricky Star, T.R.I",
            path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/d74350d594947dca2485/4221478074018524603?authen=exp=1675953265~acl=/d74350d594947dca2485/*~hmac=f1a5afb57e7b242cbcf4b771c68924cc&fs=MTY3NTmUsIC4MDQ2NTY0Mnx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Thien-Than-Tinh-Yeu-Ricky-Star-T-R-I.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/1/1/0/8110f74b9ee4cdc34fc7da051936c465.jpg"
        },
        {
            name: "3107(Cover)",
            singer: "Music 30-365",
            path: "https://vnso-zn-5-tf-mp3-320s1-zmp3.zmdcdn.me/935ab3cb048cedd2b49d/2729900295051925967?authen=exp=1675953741~acl=/935ab3cb048cedd2b49d/*~hmac=11b0d0b2ba015222b8e7efa3c8604e0e&fs=MTY3NTmUsIC4MDk0MTM5MXx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=3107-Cover-Music-30-365.mp3",
            image: "https://photo-playlist-zmp3.zmdcdn.me/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqPu401LMcs7HcKvU0W7EOTlB60zJLfyqYSjD3W5SdcVJbniB30tFPe6D5KyD0OaqYiPN1ZuQZZYzm1nRT0t3TFhHN4a-HyCf-j1S52b7rNkZsrCHUqo5V_BLL1DzJjryeDPRGtjBZdxnXWu9S5ZPShVK7Kua3eyjxPCEH34TbbwrnKDrTqcE&cv=1&size=thumb/240_240"
        },
        {
            name: "Thu Cuối",
            singer: "Yanbi x Mr T x Hằng Bingboong",
            path: "https://vnso-zn-16-tf-mp3-320s1-zmp3.zmdcdn.me/686699622226cb789237/3267604255845622783?authen=exp=1675954082~acl=/686699622226cb789237/*~hmac=496920a85073d45ace4f60d3dcaa9cee&fs=MTY3NTmUsIC4MTI4Mjg0OXx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Thu-Cuoi-Yanbi-Mr-T-Hang-BingBoong.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_png/avatars/8/e/8e02a864575266866ce9ab90731747bc_1455449226.png"
        },
        {
            name: "Tình Yêu Màu Nắng",
            singer: "Đoàn Thúy Trang x BigDaddy",
            path: "https://vnso-zn-24-tf-mp3-320s1-zmp3.zmdcdn.me/f387e38d46c9af97f6d8/9039649245666470762?authen=exp=1675954303~acl=/f387e38d46c9af97f6d8/*~hmac=a936e62e5b9b8522559ddb832362d90d&fs=MTY3NTmUsIC4MTUwMzkzOXx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Tinh-Yeu-Mau-Nang-Doan-Thuy-Trang-BigDaddy.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_png/covers/d/a/dacab76fe473d64942d2036ccebb1b0d_1427779844.png"
        },
        {
            name: "Chờ Đợi Có Đáng Sợ",
            singer: "Andiez",
            path: "https://vnso-zn-15-tf-mp3-320s1-zmp3.zmdcdn.me/97e5fd2ca76d4e33177c/4184071194132652003?authen=exp=1675954411~acl=/97e5fd2ca76d4e33177c/*~hmac=308c3bedca97ed3e9f69813f4deef409&fs=MTY3NTmUsIC4MTYxMTA3Mnx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Cho-Doi-Co-Dang-So-Andiez.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/1/5/e/515e8d82b5d816639e0bb8fd1fbc9c00.jpg"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "MONSTAR",
            path: "https://vnso-zn-23-tf-mp3-320s1-zmp3.zmdcdn.me/071fe08e69c88096d9d9/1456120627949641687?authen=exp=1675954543~acl=/071fe08e69c88096d9d9/*~hmac=7d314ceb5fb923760f03367ec0b95dee&fs=MTY3NTmUsIC4MTmUsIC0MzgxNnx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=co-hen-voi-thanh-xuan-MONSTAR.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg"
        },
        {
            name: "Mashup Nevada x Đi Đi Đi",
            singer: "K-ICM x T-ICM x Zickky x Kelsey",
            path: "https://vnso-zn-5-tf-mp3-320s1-zmp3.zmdcdn.me/a4552b2f3e68d7368e79/5112852139800973782?authen=exp=1676035661~acl=/a4552b2f3e68d7368e79/*~hmac=0f1c077aa4381b6bcd9f5850eba3ce3c&fs=MTY3NTg2Mjg2MTmUsICyOHx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Mashup-Nevada-x-Di-Di-Di-Daniel-Mastro-Remix-K-ICM-T-ICM-Zickky-Kelsey.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg"
        },
        {
            name: "Summertime",
            singer: "K-391",
            path: "https://vnso-zn-15-tf-mp3-320s1-zmp3.zmdcdn.me/08e9c4b92affc3a19aee/8963071444061027784?authen=exp=1676035790~acl=/08e9c4b92affc3a19aee/*~hmac=c9ad3aa269d4917d0f2d217e5b824f44&fs=MTY3NTg2Mjk5MDk1OXx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Summertime-K-391.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/8/2/9/9/82998293f8c34d7999339490d0b90118.jpg"
        },
        {
            name: "Tada koe hitotsu",
            singer: "Rokudenashi",
            path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/c7a14d1976599f07c648/3259205200646780660?authen=exp=1676035849~acl=/c7a14d1976599f07c648/*~hmac=c632e624363ad365afbcf80e1959c544&fs=MTY3NTg2MzA0OTI0Mnx3ZWJWNnwxMDI0MjIwNTIyfDE0LjE3Ni43Mi4xNzk&filename=Tada-koe-hitotsu-Rokudenashi.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
        },
        {
            name: "Lemon",
            singer: "Kobasolo & Harutya",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui961/Lemon-KenshiYonezu-5411306.mp3?st=9kknw6hFShvKlWuYr3XIeA&e=1676464132&download=true",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/5/b/0/4/5b042516d7bc2120c4095d4de45974a5.jpg"
        },
        {
            name: "Sakura",
            singer: "Ikimonogakari",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui793/Sakura5CmsOST-IkimonoGakari_4dvpj.mp3?st=hpx3eOpSqX676AXACBciKg&e=1676464387&download=true",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/7/2/8/0/728078e0f01a754a1abd1937e08e1ee5.jpg"
        },
        {
            name: "Hazy Moon",
            singer: "Hatsune Miku",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui960/HazyMoon-HatsuneMiku-1689454.mp3?st=0cJefQ8ngis_FBcjM6NXPA&e=1676464400&download=true",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/9/9/b/6/99b6bc92ae1c3c0210523b9fdf0aaf9d.jpg"
        }
    ],

    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" >
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
        //Xử lý phóng to/ thu nhỏ CD
        document.onscroll = function(){            
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi click play
        playBtn.onclick = function(){
            if(!app.isPlaying){
                audio.play()
            } else{
                audio.pause()
            }
        }
        //Khi song được play
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
        }
        //Khi song pause
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url:('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    start: function(){
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()
        //Lắng nghe / xử lý các sự kiện(DOM events)
        this.handleEvents()
        //Tải thông tin bài hát đầu tiên vài UI khi tải ứng dụng
        this.loadCurrentSong()
        //Render playlist
        this.render()
    }


}

app.start()