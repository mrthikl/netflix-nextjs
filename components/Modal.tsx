import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline'
import MModal from '@mui/material/Modal'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Genre, Movie } from '../typings'
import { Element } from '../typings'
const MuiModal: any = MModal

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [data, setData] = useState()
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)
  useEffect(() => {
    if (!movie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error))

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
        setTrailer(data.videos.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
  }, [movie])

  const handleClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"'>
      <>
        <button
          onClick={handleClose}
          className='modal-button absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'>
          <XIcon className='h-6 w-6 ' />
        </button>
        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            loop
            muted={muted}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className='flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                <FaPlay className='h-7 w-7 text-black' />
                Play
              </button>
              <button className='modal-button'>
                <PlusIcon className='h-7 w-7' />
              </button>
              <button className='modal-button'>
                <ThumbUpIcon className='h-7 w-7' />
              </button>
              <button className='modal-button' onClick={() => setMuted(!muted)}>
                {muted ? <VolumeOffIcon className='h-6 w-6' /> : <VolumeUpIcon className='h-6 w-6' />}
              </button>
            </div>
          </div>
        </div>
        <div className='md:flex md:space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-lg pb-3'>
            <div className='flex flex-col items-start gap-1  text-sm lg:flex-row '>
              <p className='font-semibold text-green-400 whitespace-nowrap '>{movie!.vote_average * 10}% Match</p>
              <p className='font-light whitespace-nowrap'>{movie?.release_date || movie?.first_air_date}</p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                HD
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
            <p className='md:w-5/6'>{movie?.overview}</p>
            <div className='flex flex-col space-y-3 text-sm'>
              <div>
                <span className='text-[gray]'>Genres:</span> {genres.map((genre) => genre.name).join(', ')}
              </div>

              <div>
                <span className='text-[gray]'>Original language:</span> {movie?.original_language}
              </div>

              <div>
                <span className='text-[gray]'>Total votes:</span> {movie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default React.memo(Modal)
