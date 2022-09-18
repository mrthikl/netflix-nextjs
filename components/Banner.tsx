import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { baseUrl } from '../constants/movies'
import { Element, Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import ReactPlayer from 'react-player'
interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentmovie, setCurrentMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const fetchMovie = useCallback(async (dataMovie: Movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${dataMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${dataMovie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error))
    if (res?.videos) {
      const index = res.videos.results.findIndex((element: Element) => element.type === 'Trailer')
      setTrailer(res.videos.results[index]?.key)
    }
  }, [])

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    if (movie) fetchMovie(movie)
  }, [fetchMovie, movie, netflixOriginals])
  return (
    <div className={'flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[95vh] lg:justify-end lg:pb-12'}>
      <div className={'absolute top-0 left-0 -z-10 h-[95vh] lg:h-[100vh] w-full'}>
        {trailer ? (
          <>
            <ReactPlayer
              className='video-banner overflow-hidden hidden lg:block'
              width='100%'
              height='270vh'
              url={`https://www.youtube.com/watch?v=${trailer}`}
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing={true}
              controls={false}
              loop={true}
              muted={true}
            />
            <Image
              className='lg:hidden'
              layout='fill'
              alt={movie?.backdrop_path || movie?.poster_path}
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              objectFit='cover'
            />
          </>
        ) : (
          <Image
            layout='fill'
            alt={movie?.backdrop_path || movie?.poster_path}
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            objectFit='cover'
          />
        )}
        {/* <Image
          layout='fill'
          alt={movie?.backdrop_path || movie?.poster_path}
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit='cover'
        /> */}
      </div>

      <h2 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
        {movie?.title || movie?.name || movie?.original_name}
      </h2>
      <p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-3'>
        {movie?.overview}
      </p>
      <div className='flex space-x-3'>
        <button className='banner-button bg-white text-black'>
          <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
          Play
        </button>
        <button
          className={'banner-button bg-[gray]/70'}
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
          <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8' /> More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
