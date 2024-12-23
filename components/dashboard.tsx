"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({
  memoriesData,
}: {
  memoriesData: { count: number; category: string }[];
}) {
  const data = {
    labels: memoriesData.map((item) => item.category),
    datasets: [
      {
        label: "Ilość wspomnień",
        data: memoriesData.map((item) => item.count),
        backgroundColor: "green",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: false, text: "Memories Dashboard" },
    },
  };

  return (
    <div className="my-8">
      <Bar data={data} options={options} />
    </div>
  );
}
