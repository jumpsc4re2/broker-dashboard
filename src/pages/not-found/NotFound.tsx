import { Ban } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const NotFoundPage = () => {
  return (
    <>
      <Empty className="mt-[30vh]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Ban color="red" size={100} />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-bold">Error 404</EmptyTitle>
          <EmptyDescription className="text-lg">This Page Was Not Found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Link to="/">Go Home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
};
export default NotFoundPage;
