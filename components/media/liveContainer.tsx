import { useEffect } from "react"
import flvjs from 'flv.js'
import { MediaOptions } from "@/types/media"

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

export const LiveContainer = (props: {
  options: MediaOptions
}) => {

  useEffect(() => {
    if (flvjs.isSupported()) {
      const videoElement: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
      const flvPlayer = flvjs.createPlayer({
        type: props.options.sources[0].type,
        url: props.options.sources[0].src,
      }, {
        isLive: true
      });

      videoElement.addEventListener('play', () => {

        const ctx = new AudioContext()
        const canAutoPlay = ctx.state === 'running'
        if (canAutoPlay) {
          videoElement.volume = 0.5
          videoElement.muted = false
        }
      })

      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
      videoElement.play()

    }
  })

  return (
    <>
      <video
        id="videoElement" controls muted
        className="w-full bg-cover max-w-[900px] max-h-[510px]"
        poster={`${StoreFileHost}/bee-channel/image/no_living.png`}
      >
      </video>
    </>
  )
}