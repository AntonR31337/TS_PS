import React, { useEffect, useRef, useState } from 'react'
import sound from '../assets/metronome.wav'

const DEFAULT_BPM = 100

const Metronome = () => {
	const [bpm, setBpm] = useState(DEFAULT_BPM)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const startInterval = (intervalMs: number) => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}
		new Audio(sound).play()
		intervalRef.current = setInterval(() => {
			new Audio(sound).play()
		}, intervalMs)
	}

	const stopInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}

	useEffect(() => {
		if (isPlaying) {
			startInterval(60000 / bpm)
		}
		return () => stopInterval()
	}, [bpm])

	const toggle = () => {
		if (isPlaying) {
			stopInterval()
			setIsPlaying(false)
		} else {
			startInterval(60000 / bpm)
			setIsPlaying(true)
		}
	}

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
			<button onClick={toggle}>{isPlaying ? 'Стоп' : 'Метроном'}</button>
			<label>
				BPM:
				<input
					type="number"
					min={20}
					max={300}
					value={bpm}
					onChange={(e) => setBpm(Number(e.target.value) || DEFAULT_BPM)}
					style={{ width: 60, marginLeft: 4 }}
				/>
			</label>
		</div>
	)
}

export default Metronome
