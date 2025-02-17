import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types/type';
import {
  DollarSign,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardDashboard = () => {
  const { data } = useQuery<ApiResponse[]>({
    queryKey: ['apiData'],
    // Don't refetch, just use cached data
    enabled: true,
    staleTime: Infinity,
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const totalUsage = data?.reduce((total, account) => {
    const currentValue = parseFloat(account.data3[0]?.threshold?.current_value || "0");
    return total + currentValue;
  }, 0) || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
      <Card className="xl:col-start-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Used Bandwidth
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsage.toFixed(2)} GB</div>
          <p className="text-xs text-muted-foreground">
            {monthNames[new Date().getMonth()]} month
          </p>
        </CardContent>
      </Card>
      <Card className="xl:col-start-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Gcore Subscriptions
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.length || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDashboard;
