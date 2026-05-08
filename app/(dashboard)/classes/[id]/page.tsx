"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Globe,
  Lock,
  Copy,
  Share2,
  Plus,
  MoreHorizontal,
  Calendar,
  Clock,
  User,
  Mail,
  Download,
  Upload,
  Settings,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CreateClassDialog } from "../components/create-class-dialog";

// Mock class detail data
const mockClassDetail = {
  id: "class_001",
  userId: "user_001",
  name: "Advanced Math 10A1",
  description:
    "Class for gifted math students in grade 10. Focus on advanced algebra, geometry, and problem-solving techniques.",
  subject: "Mathematics",
  code: "M10A1ADV",
  isPublic: true,
  memberIds: ["user_101", "user_102", "user_103", "user_104", "user_105"],
  setIds: ["set_001", "set_002", "set_003"],
  thumbnailUrl: "/thumbnails/math.jpg",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-03-20"),
  owner: {
    id: "user_001",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/avatars/user_001.jpg",
  },
};

// Mock members data
const mockMembers = [
  {
    id: "user_101",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "student",
    joinedAt: new Date("2024-01-20"),
    avatar: null,
  },
  {
    id: "user_102",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "student",
    joinedAt: new Date("2024-01-20"),
    avatar: null,
  },
  {
    id: "user_103",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "student",
    joinedAt: new Date("2024-01-22"),
    avatar: null,
  },
  {
    id: "user_104",
    name: "David Brown",
    email: "david@example.com",
    role: "student",
    joinedAt: new Date("2024-02-01"),
    avatar: null,
  },
  {
    id: "user_105",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "student",
    joinedAt: new Date("2024-02-15"),
    avatar: null,
  },
];

// Mock study sets data
const mockStudySets = [
  {
    id: "set_001",
    name: "Algebra Fundamentals",
    termCount: 25,
    type: "flashcard",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "set_002",
    name: "Geometry Theorems",
    termCount: 18,
    type: "quiz",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-18"),
  },
  {
    id: "set_003",
    name: "Problem Solving Techniques",
    termCount: 30,
    type: "flashcard",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-20"),
  },
];

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState(mockClassDetail);
  const [members] = useState(mockMembers);
  const [studySets] = useState(mockStudySets);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const copyClassCode = async () => {
    await navigator.clipboard.writeText(classData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteClass = () => {
    // Handle delete logic here
    setIsDeleteDialogOpen(false);
    router.push("/classes");
  };

  const memberProgress = {
    total: members.length,
    active: 4,
    completed: 3,
    averageScore: 78,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-2"
        onClick={() => router.push("/classes")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Classes
      </Button>

      {/* Class Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {getInitials(classData.name)}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{classData.name}</h1>
              <Badge variant={classData.isPublic ? "default" : "secondary"}>
                {classData.isPublic ? (
                  <Globe className="h-3 w-3 mr-1" />
                ) : (
                  <Lock className="h-3 w-3 mr-1" />
                )}
                {classData.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {classData.subject}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {classData.memberIds.length} members
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Created {classData.createdAt.toLocaleDateString("en-US")}
              </span>
            </div>
            {classData.description && (
              <p className="text-sm text-muted-foreground max-w-2xl">
                {classData.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyClassCode}>
            {copied ? (
              "Copied!"
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                {classData.code}
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <CreateClassDialog
            trigger={
              <Button variant="default" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Class
              </Button>
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Class
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Class Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">
            Members ({members.length})
          </TabsTrigger>
          <TabsTrigger value="study-sets">
            Study Sets ({studySets.length})
          </TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberProgress.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {memberProgress.active} active this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Study Sets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studySets.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across {classData.subject}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {memberProgress.averageScore}%
                </div>
                <Progress value={memberProgress.averageScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (memberProgress.completed / memberProgress.total) * 100
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {memberProgress.completed} of {memberProgress.total} completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Owner Info & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Owner Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={classData.owner.avatar} />
                    <AvatarFallback>
                      {getInitials(classData.owner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{classData.owner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {classData.owner.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">
                      Emma Wilson completed "Algebra Fundamentals"
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      2h ago
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">
                      New study set "Calculus Basics" added
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      1d ago
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">
                      David Brown joined the class
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      3d ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search members..."
                className="w-64"
              />
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar || ""} />
                        <AvatarFallback>
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.email}
                          <span>•</span>
                          <User className="h-3 w-3" />
                          {member.role}
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          Joined {member.joinedAt.toLocaleDateString("en-US")}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Sets Tab */}
        <TabsContent value="study-sets" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search study sets..."
                className="w-64"
              />
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Study Set
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studySets.map((set) => (
              <Card key={set.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{set.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {set.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {set.termCount} terms
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Updated {set.updatedAt.toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1">
                      <BookOpen className="mr-2 h-3 w-3" />
                      Study
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart className="mr-2 h-3 w-3" />
                      Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    user: "Alice Johnson",
                    action: "completed",
                    target: "Algebra Fundamentals",
                    time: "2 hours ago",
                    type: "study",
                  },
                  {
                    user: "John Smith",
                    action: "added",
                    target: "Calculus Basics study set",
                    time: "1 day ago",
                    type: "create",
                  },
                  {
                    user: "David Brown",
                    action: "joined",
                    target: "the class",
                    time: "3 days ago",
                    type: "join",
                  },
                  {
                    user: "Carol Davis",
                    action: "scored 85% on",
                    target: "Geometry Theorems quiz",
                    time: "5 days ago",
                    type: "quiz",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                        activity.type === "study"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "create"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "join"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.type === "study" ? (
                        <BookOpen className="h-4 w-4" />
                      ) : activity.type === "create" ? (
                        <Plus className="h-4 w-4" />
                      ) : activity.type === "join" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <BarChart className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{classData.name}"? This action
              cannot be undone. All study sets, member data, and progress will
              be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type <span className="font-bold">DELETE</span> to confirm
            </Label>
            <Input id="confirm" placeholder="DELETE" />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteClass}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}