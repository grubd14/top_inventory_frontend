import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const IndexPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
          <p className="text-muted-foreground mb-8">
            Track, manage, and organize your inventory with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="w-full sm:w-auto">Register</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
