import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <>
      <Card className="flex justify-center h-[200px] min-w-[375px] bg-slate-100 mx-[15px] my-[17px] rounded-lg shadow-md text-center items-center">
        This is card
      </Card>
    </>
  );
}

export default App;
