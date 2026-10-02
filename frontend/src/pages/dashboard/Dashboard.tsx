import Revenue from "@/pages/dashboard/revenue/Revenue";

import { ProfitBarchart } from "./profit-barchart/ProfitBarchart";
import NetDepositChart from "./region-revenue-chart/NetDepositChart";
import RevenueChart from "./revenue-chart/RevenueChart";
import SalesChart from "./sales-chart/SalesChart";
import TopCountries from "./top-countries/TopCountries";

const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Revenue
          description="Product Revenue"
          revenue="$1,040"
          percentage="8"
          growth="100"
          isWin={true}
        />
        <Revenue
          description="Total Orders"
          revenue="300"
          percentage="12"
          growth="200"
          isWin={true}
        />
        <Revenue
          description="System Revenue"
          revenue="$10,200"
          percentage="10"
          growth="50"
          isWin={true}
        />
        <Revenue
          description="Company Revenue"
          revenue="$2,040"
          percentage="12"
          growth="200"
          isWin={false}
        />
      </div>
      <RevenueChart />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5 items-start">
        <SalesChart />
        <NetDepositChart />
        <TopCountries />
      </div>
      <div>
        {/* <ProSection /> */}
        <ProfitBarchart />
      </div>
    </>
  );
};
export default DashboardPage;
