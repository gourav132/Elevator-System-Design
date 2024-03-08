import { Hero, Floor } from "./Components";

function App() {
  return (
    <div className="bg-black h-screen items-center">
      <Hero />
      <div className="h-5/6 flex items-center">
        <Floor />
      </div>
    </div>
  );
}

export default App;
