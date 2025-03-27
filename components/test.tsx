import { useRef, useState } from 'react'

const Student = () => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [isPlaing, setIsPlaing] = useState(false)
  const handlePlay = () => {
    const video = ref.current
    if (video) {
      isPlaing ? video.pause() : video.play()
    }
    setIsPlaing(!isPlaing)
  }

  return (
    <video
      id='video'
      ref={ref}
      width='600'
      onClick={handlePlay}
      className='rounded-full'
    >
      <source src='/video.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  )
}

export default Student
