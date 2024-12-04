import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [oscar, setOscar] = useState(false);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: title,
        releaseDate: releaseDate,
        oscar: oscar,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <h1>Movies</h1>

      <div>
        {movieList.map((movie) => (
          <div>
            <h2 style={{ color: movie.oscar ? "green" : "red" }}>
              {movie.title}
            </h2>
            <h3>Release Date: {movie.releaseDate}</h3>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>

      <hr />

      <h1>New Movie</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Movie Title"
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <input
          type="number"
          placeholder="Enter Release Year"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
          className="form-control"
        />
        <label>
          <input
            type="checkbox"
            onChange={(e) => setOscar(e.target.checked)}
          />
          Oscar
        </label>

        <button
          className="btn"
          onClick={handleCreateMovie}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Movies;
