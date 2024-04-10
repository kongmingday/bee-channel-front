import { MediaOptions } from '@/types/media';
import { memo, useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

const TitleBar = (title: string) => {
	const titleBar = document.querySelector('.vjs-title-bar');
	titleBar?.classList.remove('vjs-hidden');
	const titleDiv = document.querySelector('.vjs-title-bar-title');
	titleDiv!.innerHTML = title;
};

export const VideoContainer = memo(
	(props: { options: MediaOptions; onReady: any }) => {
		const videoRef = useRef<HTMLDivElement>(null);
		const playerRef = useRef<Player>();

		let optionsT = {
			...props.options,
			autoplay: false,
			controls: true,
			responsive: true,
			fluid: true,
			playbackRates: [0.5, 1, 1.5, 2],
			controlBar: {
				volumePanel: {
					inline: false,
				},
			},
		};

		useEffect(() => {
			// Make sure Video.js player is only initialized once
			if (!playerRef.current) {
				// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
				const videoElement = document.createElement('video-js');

				videoElement.classList.add('vjs-16-9');
				videoRef?.current?.appendChild(videoElement);

				const player = (playerRef.current = videojs(
					videoElement,
					optionsT,
					() => {
						videojs.log('player is ready');
						props.onReady && props.onReady(player);
					},
				));
				// You could update an existing player in the `else` block here
				// on prop change, for example:
			} else {
				const player = playerRef.current;

				player.autoplay(optionsT.autoplay);
				player.src(optionsT.sources);
			}
			TitleBar(optionsT.title);
			const t = typeof videoRef;
		}, [optionsT, videoRef]);

		// Dispose the Video.js player when the functional component unmounts
		useEffect(() => {
			const player = playerRef.current;

			return () => {
				if (player && !player.isDisposed()) {
					player.dispose();
					playerRef.current = undefined;
				}
			};
		}, [playerRef]);

		return (
			<div data-vjs-player>
				<div
					ref={videoRef}
					className='t1'
				/>
			</div>
		);
	},
	(previous, current) => {
		const { options: previousOpt } = previous;
		const { options: currentOpt } = current;
		return previousOpt.title === currentOpt.title;
	},
);

VideoContainer.displayName = 'VideoContainer';

export default VideoContainer;
