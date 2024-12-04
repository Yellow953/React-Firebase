import "./App.css";
import Auth from "./components/auth";
import Movies from "./components/movies";
import { auth } from "./config/firebase";

function App() {
  return <div>{auth?.currentUser ? <Movies /> : <Auth />}</div>;
}

export default App;
