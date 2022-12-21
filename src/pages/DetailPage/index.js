import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

function DetailPage() {

  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  // 상세페이지에서 영화 상세 정보 데이터 가져오기
  useEffect (() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if(!movie) return <div>자료가 없습니다.</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}

export default DetailPage;