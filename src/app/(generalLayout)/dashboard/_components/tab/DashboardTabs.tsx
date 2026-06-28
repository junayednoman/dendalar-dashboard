import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeopleTabContent from "../tabContent/PeopleTabContent";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="users">
      <TabsList className="mb-3 h-12 w-full rounded-xl border border-border bg-transparent p-1">
        <TabsTrigger
          value="users"
          className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Users
        </TabsTrigger>
        <TabsTrigger
          value="levels"
          className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Levels
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <PeopleTabContent roleLabel="User" />
      </TabsContent>
      <TabsContent value="levels">
        <PeopleTabContent roleLabel="Coach" />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
