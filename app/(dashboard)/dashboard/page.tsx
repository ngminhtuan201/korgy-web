import { BookOpen, Gamepad2, GraduationCap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Classes",
      value: "12",
      icon: GraduationCap,
      description: "Active classes",
    },
    {
      title: "Total Sessions",
      value: "48",
      icon: Gamepad2,
      description: "Quiz sessions",
    },
    {
      title: "Total Students",
      value: "256",
      icon: Users,
      description: "Enrolled students",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-primary">
          Welcome back!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your teaching activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Math 101", "Science Grade 5", "English Basics"].map(
                (className, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <span className="font-medium">{className}</span>
                    <span className="text-sm text-muted-foreground">
                      {20 + i * 5} students
                    </span>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Math Quiz 1", code: "ABC12", students: 18 },
                { name: "Science Quiz", code: "XYZ34", students: 22 },
                { name: "English Test", code: "DEF56", students: 15 },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div>
                    <span className="font-medium">{session.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({session.code})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {session.students} students
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
