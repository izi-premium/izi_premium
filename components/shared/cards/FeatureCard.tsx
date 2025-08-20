import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="h-full w-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="paragraph-24-medium text-black-600">
          {title}
        </CardTitle>
        <Icon className="text-black-500 h-6 w-6" />
      </CardHeader>
      <CardContent>
        <p className="paragraph-18-normal text-black-500">{description}</p>
      </CardContent>
    </Card>
  );
}
