import { Card } from "./Card";

export const Cards = () => {
  return (
    <div className="bg-slate-100 p-2  flex justify-center gap-2">
      <Card
        title="List Orders"
        text="Look into recent orders"
        bg="bg-slate-200"
        buttonText="Browse orders"
        buttonBg="bg-slate-700"
        buttonLink="/jobs"
      />
      <Card
        title="Create Orders"
        text="Add a new order"
        bg="bg-indigo-200"
        buttonText="Add Order"
        buttonBg="bg-indigo-700"
        buttonLink="/add-job"
      />
    </div>
  );
};
