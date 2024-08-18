"use client";

import dynamic from "next/dynamic";

const CardDashboard = dynamic(() => import("./components/cardDashboard"), {
  ssr: false,
});
const TableServers = dynamic(() => import("./components/tableServers"), {
  ssr: false,
});
export default function Home() {
  return (
    <main className="flex flex-1 flex-col  gap-4 p-4 md:gap-8 md:p-8">
      <CardDashboard />
      <TableServers />
    </main>
  );
}
