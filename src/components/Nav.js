import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

 const  Nav = ({libraryStatus , setLibraryStatus , currentSong})  =>{

    const openLibraryHandler = () => {
        setLibraryStatus(!libraryStatus)
    }

    return (
       <nav>
      <h1 className="nav_title">My Togo_Fav</h1>
      <button
      style={{
                  background : `linear-gradient(to right , ${currentSong.color[0]} , ${currentSong.color[1]})`
        }}
        className={libraryStatus ? "library_active" : ""}
        onClick={openLibraryHandler}
      >
        Library
        <FontAwesomeIcon size="2x" icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
    )
}

export default Nav
