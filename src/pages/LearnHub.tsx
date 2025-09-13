import { useState } from "react";
import { Search, BookOpen, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Import topic images
import topicAir from "@/assets/topic-air.jpg";
import topicWater from "@/assets/topic-water.jpg";
import topicWaste from "@/assets/topic-waste.jpg";
import topicWildlife from "@/assets/topic-wildlife.jpg";

const learningTopics = [
  {
    id: 1,
    title: "Air Quality & Atmosphere",
    description: "Learn about air pollution, greenhouse gases, and climate change",
    image: topicAir,
    progress: 75,
    isUnlocked: true,
    lessonsTotal: 8,
    lessonsCompleted: 6,
    category: "Essential",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Water Conservation",
    description: "Discover water cycles, pollution, and conservation methods",
    image: topicWater,
    progress: 60,
    isUnlocked: true,
    lessonsTotal: 10,
    lessonsCompleted: 6,
    category: "Essential",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Waste Management",
    description: "Master recycling, composting, and waste reduction strategies",
    image: topicWaste,
    progress: 30,
    isUnlocked: true,
    lessonsTotal: 12,
    lessonsCompleted: 4,
    category: "Practical",
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Wildlife Protection",
    description: "Explore biodiversity, endangered species, and conservation efforts",
    image: topicWildlife,
    progress: 0,
    isUnlocked: false,
    lessonsTotal: 15,
    lessonsCompleted: 0,
    category: "Advanced",
    difficulty: "Advanced"
  }
];

export default function LearnHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Essential", "Practical", "Advanced"];

  const filteredTopics = learningTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learning Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Explore interactive lessons and become an environmental champion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className={`card-interactive ${!topic.isUnlocked ? 'opacity-60' : ''}`}>
              <div className="relative">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {!topic.isUnlocked && (
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant={getDifficultyColor(topic.difficulty) as any}>
                    {topic.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {topic.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{topic.lessonsCompleted}/{topic.lessonsTotal} lessons</span>
                  <span>{topic.progress}% complete</span>
                </div>
                
                <Progress 
                  value={topic.progress} 
                  variant={topic.progress >= 80 ? "success" : topic.progress >= 50 ? "warning" : "default"}
                />

                <div className="flex items-center gap-2">
                  <Button 
                    className="flex-1" 
                    disabled={!topic.isUnlocked}
                    variant={topic.isUnlocked ? "default" : "outline"}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {topic.isUnlocked ? "Continue Learning" : "Locked"}
                  </Button>
                  {topic.progress === 100 && (
                    <CheckCircle className="w-6 h-6 text-success" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-12 bg-card rounded-lg p-6 border">
          <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {learningTopics.filter(t => t.progress > 0).length}
              </div>
              <div className="text-muted-foreground">Topics Started</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                {learningTopics.filter(t => t.progress === 100).length}
              </div>
              <div className="text-muted-foreground">Topics Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {learningTopics.reduce((sum, t) => sum + t.lessonsCompleted, 0)}
              </div>
              <div className="text-muted-foreground">Total Lessons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}