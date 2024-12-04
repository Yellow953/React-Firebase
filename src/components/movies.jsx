import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
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

  const createMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: title,
        releaseDate: releaseDate,
        oscar: oscar,
        userId: auth?.currentUser?.uid,
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
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const _signOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <button onClick={_signOut}>Sign Out</button>

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
        />
        <input
          type="number"
          placeholder="Enter Release Year"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
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
          onClick={createMovie}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Movies;
