import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useVideoInfo = keyword => {
  const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`
  const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet,statistics`
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      const uri = keyword ? keywordUri+keyword : popularUri;
      return axios
              .get(`/data/${keyword ? 'search' : 'popular'}.json`)
              // .get(uri)
              .then(res => res.data.items);
    }, staleTime: 1000 * 60 * 1,      // 1분, ms 단위
  });
  return { isLoading, error, videos };
}

export const useChannelInfo = id => {
  const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`
  const {data: url} = useQuery({
    queryKey: ['channel', id],
    queryFn: async () => {
      return axios
              .get(channelUrl)
              .then(res => res.data.items[0].snippet.thumbnails.default.url)
              .catch(res => console.log(res))
    }, staleTime: 1000 * 60 * 5,    // 5분
  });
  return{ url };
}

export const useRelatedVideo = channelId => {
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['relatedVideos', channelId],
    queryFn: async () => {
      const channelVideo = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channelId}`
      return axios
              .get(channelVideo)
              .then(res => res.data.items);
    }, staleTime: 1000 * 60 * 1
  });
  return { isLoading, error, videos };
}
