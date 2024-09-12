import React from "react";

import Stats from "../components/Stats";
import ProposalsTable from "../components/ProposalsTable";
// import SalesOverviewChart from "../components/sales-chart";
import dynamic from 'next/dynamic';

const SalesOverviewChart = dynamic(() => import('../components/sales-chart'), { ssr: false });

const DashboardPage = () => {
  return (
    <div>
      <h2 className="scroll-m-20 pb-7 text-3xl font-bold tracking-tight first:mt-0">
        Dashboard
      </h2>

      <div className="space-y-8">
        <Stats />
        <SalesOverviewChart />
        <ProposalsTable />
      </div>
    </div>
  );
};

export default DashboardPage;
