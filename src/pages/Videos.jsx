import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      return axios
              .get(`/data/${keyword ? 'search' : 'popular'}.json`)
              .then(res => res.data.items);
    }, staleTime: 1000 * 60 * 1,      // 1분, ms 단위
  });
  // useEffect(() => {
  //   axios.get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //     .then(res => {setVideos(res.data.items);
  //     console.log(videos);
  //     })
  // }, [keyword]);
  return (
    <div>
      Videos {keyword ? `${keyword} 로 검색` : 'Hot Trend'}
      {isLoading && <p>Loading...</p>}
      {error && <h1>Got Some Error!</h1>}
      {videos && 
        <ul>
        {
          videos.map(video => (
            <li key={video.id}>{video.snippet.title}</li>
          ))
        }
        </ul>
      }
    </div>
  )
}