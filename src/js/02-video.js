import '../sass/main.scss';
import Player from '@vimeo/player';
import throttle  from 'lodash.throttle';


const iframe = document.querySelector('#vimeo-player');
    const player = new Player(iframe);

    const onTimeUpdate = function(data) {
        console.log(data)
        localStorage.setItem("videoplayer-current-time", JSON.stringify(data));
    };
    
    player.on('timeupdate', throttle(onTimeUpdate, 1000));

    if (localStorage.getItem("videoplayer-current-time")) {
        const lastTime = JSON.parse(localStorage.getItem("videoplayer-current-time")).seconds
        player.setCurrentTime(lastTime).then(function(seconds) {
            // seconds = the actual time that the player seeked to
        }).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    // the time was less than 0 or greater than the video’s duration
                    break;
        
                default:
                    // some other error occurred
                    break;
            }
        });
    }
