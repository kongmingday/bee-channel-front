import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const TitleBar = (title) => {
  const titleBar = document.querySelector('.vjs-title-bar')
  titleBar.classList.remove('vjs-hidden')
  const titleDiv = document.querySelector('.vjs-title-bar-title')
  titleDiv.innerHTML = title
}

export const VideoContainer = (props) => {
  const videoRef = useRef()
  const playerRef = useRef()
  let { options, onReady } = props

  options = {
    ...options,
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      volumePanel: {
        inline: false
      }
    }
  }

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-16-9');
      videoRef?.current?.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      })
      TitleBar(options.title)
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}