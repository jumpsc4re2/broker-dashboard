import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Country from "./Country";

const TopCountries = () => {
  const countries = [
    {
      countryCode: "US",
      revenue: "20,000",
      countryName: "United States",
      rank: 1,
    },
    {
      countryCode: "AE",
      revenue: "15,000",
      countryName: "United Arab Emirates",
      rank: 2,
    },
    {
      countryCode: "SA",
      revenue: "10,000",
      countryName: "Saudi Arabia",
      rank: 3,
    },
    {
      countryCode: "GB",
      revenue: "5,000",
      countryName: "United Kingdom",
      rank: 4,
    },
    {
      countryCode: "EG",
      revenue: "1,000",
      countryName: "Egypt",
      rank: 5,
    },

    // ➕ new ones
    {
      countryCode: "DE",
      revenue: "900",
      countryName: "Germany",
      rank: 6,
    },
    {
      countryCode: "FR",
      revenue: "850",
      countryName: "France",
      rank: 7,
    },
    {
      countryCode: "IT",
      revenue: "780",
      countryName: "Italy",
      rank: 8,
    },
    {
      countryCode: "ES",
      revenue: "720",
      countryName: "Spain",
      rank: 9,
    },
    {
      countryCode: "NL",
      revenue: "650",
      countryName: "Netherlands",
      rank: 10,
    },
    {
      countryCode: "TR",
      revenue: "600",
      countryName: "Turkey",
      rank: 11,
    },
    {
      countryCode: "CA",
      revenue: "580",
      countryName: "Canada",
      rank: 12,
    },
    {
      countryCode: "AU",
      revenue: "550",
      countryName: "Australia",
      rank: 13,
    },
    {
      countryCode: "JP",
      revenue: "500",
      countryName: "Japan",
      rank: 14,
    },
    {
      countryCode: "BR",
      revenue: "450",
      countryName: "Brazil",
      rank: 15,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
          <CardDescription>Top Countries Used Our System.</CardDescription>
        </CardHeader>

        <CardContent>
          {countries.slice(0, 4).map((cntry, index) => {
            return (
              <Country
                key={index}
                countryCode={cntry.countryCode}
                revenue={cntry.revenue}
                countryName={cntry.countryName}
                rank={cntry.rank}
              />
            );
          })}
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger
              className="w-full bg-primary h-7 rounded-md text-white"
              disabled={countries.length <= 4}
            >
              Show All
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>All Countries</DialogTitle>
                <DialogDescription>Top countries used our system.</DialogDescription>
              </DialogHeader>

              <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                {countries.map((cntry, index) => {
                  return (
                    <div key={index} className="my-5">
                      <Country
                        countryCode={cntry.countryCode}
                        revenue={cntry.revenue}
                        countryName={cntry.countryName}
                        rank={cntry.rank}
                      />
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};
export default TopCountries;
