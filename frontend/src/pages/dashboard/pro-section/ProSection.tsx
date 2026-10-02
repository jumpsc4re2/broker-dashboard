import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProSection = () => {
  return (
    <Card className="flex flex-col justify-between gap-4 bg-linear-to-l from-chart-1 to-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Upgrade to Pro!</CardTitle>
        <CardDescription className="text-white">
          Unlock exclusive features and content!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="  w-full px-4 py-2 rounded-lg text-white bg-linear-to-r from-chart-1 via-primary to-chart-1 bg-size-[200%_200%] transition-[background-position] duration-300 hover:bg-position-[100%_50%]">
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
};
export default ProSection;
