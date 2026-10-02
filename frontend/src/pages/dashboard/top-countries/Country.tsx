import * as flags from "country-flag-icons/react/3x2";

type Country = {
  rank: number;
  countryCode: string;
  countryName: string;
  revenue: string;
};

const Country = ({ rank, countryCode, countryName, revenue }: Country) => {
  const Flag = flags[countryCode as keyof typeof flags];

  return (
    <div className="flex my-5 items-center flex-row justify-between">
      <div className="flex flex-row gap-2 items-center">
        <span>{rank}.</span>
        {Flag && <Flag className="w-10  rounded-sm" title={countryName} />}
        <p className="text-muted-foreground">{countryName}</p>
      </div>
      <p className="text-muted-foreground">${revenue}</p>
    </div>
  );
};

export default Country;
