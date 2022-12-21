import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useDebounce from "../../hooks/useDebounce";
import "./SearchPage.css";

function SearchPage() {

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  // 현재 위치 객체를 반환
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  // 검색바에 입력한 값(경로) 가져오기
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // searchTerm이 변경될 때마다 새로운 영화 데이터를 가져오기
  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      setSearchResults(request.data.results);
    } catch(error) {
      console.log("error", error);
    }
  };

  // searchTerm에 해당 영화 데이터가 있는 경우
  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return(
              <div className="movie" key={movie.id}>
                <div onClick={() => {navigate(`/${movie.id}`)}} className="movie__column-poster">
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    // searchTerm에 해당 영화 데이터가 없는 경우
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}

export default SearchPage;