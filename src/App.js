import "./App.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Search from "./components/Search";

function App() {
  return (
    <div className="bg-[#0B2447]">
      <div className="max-w-6xl mx-auto bg-[#19376D] bg min-h-svh">
        <Search />
      </div>
    </div>
  );
}

export default App;
