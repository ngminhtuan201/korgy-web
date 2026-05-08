"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  BookOpen,
  Globe,
  Lock,
  ImageIcon,
  Trash,
  Pencil,
  EyeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// Mock data based on Class model
const mockClasses = [
  {
    id: "class_001",
    userId: "user_001",
    name: "Advanced Math 10A1",
    description: "Class for gifted math students in grade 10",
    subject: "Mathematics",
    code: "M10A1ADV",
    isPublic: true,
    memberIds: ["user_101", "user_102", "user_103"],
    setIds: ["set_001", "set_002"],
    thumbnailUrl: "/thumbnails/math.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "class_002",
    userId: "user_002",
    name: "Literature 11B2",
    description: "Basic literature class for grade 11",
    subject: "Literature",
    code: "LIT11B2",
    isPublic: false,
    memberIds: ["user_201", "user_202", "user_203", "user_204"],
    setIds: ["set_003"],
    thumbnailUrl: null,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-18"),
  },
  {
    id: "class_003",
    userId: "user_001",
    name: "English Communication",
    description: "Daily English communication class",
    subject: "English",
    code: "ENG012",
    isPublic: true,
    memberIds: ["user_301", "user_302"],
    setIds: ["set_004", "set_005", "set_006"],
    thumbnailUrl: "/thumbnails/english.jpg",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-21"),
  },
  {
    id: "class_004",
    userId: "user_003",
    name: "Physics 12 Exam Prep",
    description: "National High School Exam preparation for Physics",
    subject: "Physics",
    code: "PHY12PREP",
    isPublic: false,
    memberIds: ["user_401", "user_402", "user_403", "user_404", "user_405"],
    setIds: ["set_007"],
    thumbnailUrl: null,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-15"),
  },
];

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPublic, setFilterPublic] = useState<boolean | null>(null);

  const filteredClasses = mockClasses.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPublic =
      filterPublic === null || cls.isPublic === filterPublic;

    return matchesSearch && matchesPublic;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Classes</h1>
          <p className="text-sm text-muted-foreground">
            Manage all classes in the system
          </p>
        </div>
        <Button size="lg" variant="secondary">
          <Plus className="mr-1 h-4 w-4" />
          Create Class
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-end">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes by name, code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Classes Grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card
              key={cls.id}
              className="hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">
                      {cls.name}
                    </CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Pencil className="h-4 w-4 mr-1"/>Edit</DropdownMenuItem>
                      <DropdownMenuItem><Users className="h-4 w-4 mr-1" /> Members</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Description */}
                {cls.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {cls.description}
                  </p>
                )}

                <Separator />

                {/* Class Code & Members */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {cls.code}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{cls.memberIds.length} members</span>
                  </div>
                </div>

                {/* Sets Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    {cls.setIds.length} playsets
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Created: {cls.createdAt.toLocaleDateString("en-US")}
                  </span>
                </div>

                {/* Member Avatars */}
                {cls.memberIds.length > 0 && (
                  <div className="flex items-center -space-x-2 pt-1">
                    {cls.memberIds.slice(0, 5).map((memberId, index) => (
                      <Avatar key={memberId} className="h-8 w-8 border-2 border-background">
                        <AvatarImage
                          src={`/avatars/${memberId}.jpg`}
                          alt={`Member ${index + 1}`}
                        />
                        <AvatarFallback className="text-xs bg-primary/10">
                          {getInitials(`User ${index + 1}`)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {cls.memberIds.length > 5 && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground border-2 border-background">
                        +{cls.memberIds.length - 5}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No classes found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchTerm
              ? `No classes match "${searchTerm}"`
              : "You don't have any classes yet. Create a new class to get started."}
          </p>
          <Button size="lg" variant="secondary">
            <Plus className="mr-1 h-4 w-4" />
            Create Class
          </Button>
        </div>
      )}
    </div>
  );
}