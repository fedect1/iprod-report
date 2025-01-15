import StatusTable from "@/components/home/StatusTable";
// import { ProductionDataTable } from "@/components/home/ProductionDataTable";

export default function Home() {
  return (
    <div className="w-full p-4 flex flex-row">
      <StatusTable/>
    </div>
  );
}
