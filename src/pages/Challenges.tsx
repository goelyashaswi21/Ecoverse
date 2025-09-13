import { useState } from "react";
import { Calendar, Target, Trophy, Flame, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const challenges = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Reduce your waste to absolute minimum for 7 days",
    difficulty: "Hard",
    points: 500,
    daysLeft: 3,
    progress: 60,
    isActive: true,
    category: "Waste",
    streak: 4
  },
  {
    id: 2,
    title: "Car-Free Days",
    description: "Use only public transport, walking, or cycling",
    difficulty: "Medium",
    points: 200,
    daysLeft: 1,
    progress: 80,
    isActive: true,
    category: "Transport",
    streak: 8
  },
  {
    id: 3,
    title: "Plant-Based Meals",
    description: "Eat only plant-based meals for 5 days",
    difficulty: "Medium",
    points: 300,
    daysLeft: 0,
    progress: 100,
    isActive: false,
    category: "Food",
    streak: 5
  },
  {
    id: 4,
    title: "Energy Saver",
    description: "Reduce home energy consumption by 30%",
    difficulty: "Easy",
    points: 150,
    daysLeft: 7,
    progress: 0,
    isActive: false,
    category: "Energy",
    streak: 0
  }
];

const dailyTasks = [
  { id: 1, task: "Take a 5-minute shower", completed: true, points: 20 },
  { id: 2, task: "Use reusable water bottle", completed: true, points: 15 },
  { id: 3, task: "Turn off unused lights", completed: false, points: 10 },
  { id: 4, task: "Walk or bike for transport", completed: false, points: 25 },
  { id: 5, task: "Recycle properly", completed: true, points: 15 }
];

export default function Challenges() {
  const [activeTab, setActiveTab] = useState("active");
  const [tasks, setTasks] = useState(dailyTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "success";
      case "Medium": return "warning";
      case "Hard": return "destructive";
      default: return "default";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Waste": return "earth";
      case "Transport": return "secondary";
      case "Food": return "success";
      case "Energy": return "warning";
      default: return "default";
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalPoints = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.points, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-earth text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Environmental Challenges
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Take on challenges and build sustainable habits
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Daily Tasks Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Tasks
                </CardTitle>
                <CardDescription>
                  Complete daily actions to earn points and build streaks
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">points today</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-[var(--transition-smooth)] ${
                    task.completed 
                      ? 'bg-success/10 border-success/20' 
                      : 'bg-card-hover border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Button
                      variant={task.completed ? "success" : "outline"}
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className="w-8 h-8 p-0"
                    >
                      {task.completed && <CheckCircle className="w-4 h-4" />}
                    </Button>
                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                      {task.task}
                    </span>
                  </div>
                  <Badge variant={task.completed ? "success" : "outline"}>
                    +{task.points} pts
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {completedTasks}/{tasks.length} tasks completed
              </span>
              <Progress value={(completedTasks / tasks.length) * 100} className="w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Challenge Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "active" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("active")}
            >
              Active Challenges
            </Button>
            <Button
              variant={activeTab === "available" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("available")}
            >
              Available
            </Button>
            <Button
              variant={activeTab === "completed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges
            .filter(challenge => {
              if (activeTab === "active") return challenge.isActive;
              if (activeTab === "completed") return challenge.progress === 100;
              return !challenge.isActive && challenge.progress < 100;
            })
            .map((challenge) => (
              <Card key={challenge.id} className="card-interactive">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {challenge.description}
                      </CardDescription>
                    </div>
                    <Badge variant={getDifficultyColor(challenge.difficulty) as any}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={getCategoryColor(challenge.category) as any}>
                      {challenge.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      {challenge.points} pts
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} variant={challenge.progress === 100 ? "success" : "default"} />
                  </div>

                  {challenge.streak > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-accent" />
                      <span>{challenge.streak} day streak!</span>
                    </div>
                  )}

                  {challenge.daysLeft > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant={challenge.isActive ? "default" : challenge.progress === 100 ? "success" : "outline"}
                    disabled={challenge.progress === 100}
                  >
                    {challenge.progress === 100 ? "Completed" : 
                     challenge.isActive ? "View Progress" : "Start Challenge"}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <Target className="w-8 h-8 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">
              {challenges.filter(c => c.isActive).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </Card>
          <Card className="text-center p-6">
            <Trophy className="w-8 h-8 mx-auto text-success mb-2" />
            <div className="text-2xl font-bold text-success">
              {challenges.filter(c => c.progress === 100).length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          <Card className="text-center p-6">
            <Flame className="w-8 h-8 mx-auto text-accent mb-2" />
            <div className="text-2xl font-bold text-accent">
              {Math.max(...challenges.map(c => c.streak))}
            </div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </Card>
          <Card className="text-center p-6">
            <Calendar className="w-8 h-8 mx-auto text-earth mb-2" />
            <div className="text-2xl font-bold text-earth">
              {challenges.reduce((sum, c) => sum + c.points, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </Card>
        </div>
      </div>
    </div>
  );
}