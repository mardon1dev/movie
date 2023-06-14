import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WatchContext } from '../../UseContext/useContext'

import "./Watch.scss"

const Watch = () => {

    const { data } = useContext(WatchContext);
    const { title } = useParams();

    const [long, setLong] = useState(false);

    const handleLong = ()=>{
      setLong(!long)
    }

  return (
    <div className='watching'>
        <div className='container'>
          <div className='row'>
            {
                data.filter((movie)=>movie.youtubeTrailerVideoId === title).map((item, index)=>{
                    return(
                        <div key={index} className="watch col-12 col-lg-9">
                          <div className='watch__video'>
                            <iframe 
                              className='watch__video--video'
                              src={`https://www.youtube.com/embed/${item.youtubeTrailerVideoId}`} 
                              title={item.originalTitle} 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                            </iframe>
                            <h2 className='watch__video--title'>{item.originalTitle}</h2>
                          </div>
                          <div className={!long ? `watch__info` : `watch__info2`}>
                            <span className='watch__info--view' onClick={()=>{handleLong()}}>
                              {long ? `Less it` : `View all`}
                            </span>
                            <img className='watch__info--image' src={item.posterURLs.original} alt="" />
                            <div className='watch__info--all'>
                              <div className='title'>
                                Kino nomi: {item.originalTitle}
                              </div>
                              <div className='year'>
                                Ishlab chiqarilgan: {item.year}
                              </div>
                              <div className='length'>
                                Davomiyligi: {item.runtime} min
                              </div>
                              <div className='genre'>
                                Janr: {item.genres.map((el , index)=>{
                                  return(
                                    <span key={index} className='ms-1'>{el.name}</span>
                                  )
                                })}
                              </div>
                              <div className='overview'>
                                Kino tasnifi: {item.overview}
                              </div>
                              <ul className='actors'>
                                Aktyorlar : {item.cast.map((cast, index)=>{
                                  return(
                                    <li key={index}>
                                     {index+1}: {cast}
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                    )
                })
            }
            <div className='videos col-3 d-lg-flex d-none'>
              {
                data.map((item, index) => {
                  return (
                      <div className="video" key={index}>
                          <div className="video__body">
                              <Link to={`/${item.youtubeTrailerVideoId}`} className="video__body--link">
                                  <img src={item.posterURLs.original} alt="Photo" style={{width: "100%"}} className="rounded"/>
                              </Link>
                          </div>
                          <div className='video__info'>
                              <h3 className='video__info--title'>{item.originalTitle}</h3>
                          </div>
                      </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Watch;