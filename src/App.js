import React ,  { useState , useRef} from 'react'
import Song from './components/Song';
import Player from './components/Player';
import "./styles/app.scss";
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';


const  App = ()  => {

  //ref on the audio element
   const audioRef  = useRef(null)

  //STATE
const [songInfo , setSongInfo] = useState({
         currentTime : 0,
         duration: 0,
         animationPercentage: 0 ,
})
  const [songs , setSongs] = useState(data())
  const [currentSong  , setCurrentSong] = useState(songs[0])
  const [isPlaying , setIsPlaying] = useState(false)
  const [libraryStatus , setLibraryStatus] = useState(false)

  //To get times on the audio element by " onTimeUpdate" event
const timeUpdateHandler = (e) => {

             // get the current time of the music on the audio element 
            const current = e.target.currentTime

            // get the duration of the music on the audio element 
            const duration = e.target.duration
            
            //calculate pourcentage
            const roundedCurrent = Math.round(current)
             const roundedDuration = Math.round(duration)
             const animation =  Math.round((roundedCurrent / roundedDuration) * 100) 
            //  console.log(animation);

            // Update our state 
            setSongInfo({
                ...songInfo,
                currentTime : current,
                duration,
                animationPercentage: animation
            })
    }

    // go to the next song when one finish
    const songEndHandler =  async () => {
             
           //get the current song index
          let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
            // if the cuurentIndex + 1  === songs.length : go back to 0 ! That is what modulo does
           await setCurrentSong(songs[(currentIndex + 1) %  songs.length])
           if(isPlaying) audioRef.current.play()

    }


     
        
  


  return (
    <div className={`App ${ libraryStatus ? "library-active" : "" }`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus={setLibraryStatus} currentSong={currentSong} />
        <Song currentSong={currentSong}/>
        <Player 
          songs = {songs}
          setSongs={setSongs}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          />
          <Library  
            libraryStatus = {libraryStatus}
            setSongs={setSongs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            songs={songs}
           />
          <audio 
            onLoadedMetadata={timeUpdateHandler}
            onTimeUpdate={timeUpdateHandler}
            ref={audioRef}  
            src={currentSong.audio}
            onEnded={songEndHandler}
           />
    </div>
  );
}

export default App;
