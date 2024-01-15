import Todos from "../components/todos";

const HomeScreen = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-bold text-3xl my-5">List of Todos</h1>
      <Todos />
    </div>
  );
};

export default HomeScreen;
