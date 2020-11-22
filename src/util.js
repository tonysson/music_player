
/**
 * @ description  check if the  song is playing
 * The problem was that when we are playing a musique and we select or we skip to another one 
 * The music stop playing
 * So we create this function
 * Basicaly the source of the problem is that when we select or skip another music , the source of the audio does not load instantly ,so we turn it into a promise
 * @param {boolean} isPlaying 
 * @param {element} audioRef 
 * 
 * IMPORTANT
 * Another of doing it is to use Async /Await
 */

export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((audio) => {
          audioRef.current.play();
        })
        .catch((error) => console.log(error));
    }
  }
};
