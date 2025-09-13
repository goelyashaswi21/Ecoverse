import { useState } from "react";
import { User, Edit, Trophy, Target, Leaf, Calendar, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userProfile = {
  name: "Alex Chen",
  email: "alex.chen@email.com",
  joinDate: "March 2024",
  level: 7,
  experience: 1240,
  experienceToNext: 1500,
  totalPoints: 2850,
  streakDays: 12,
  avatar: "/api/placeholder/150/150"
};

const achievements = [
  {
    id: 1,
    title: "Eco Warrior",
    description: "Complete 10 environmental challenges",
    icon: "🌱",
    earned: true,
    earnedDate: "2024-03-15"
  },
  {
    id: 2,
    title: "Quiz Master",
    description: "Score 100% on 5 quizzes",
    icon: "🧠",
    earned: true,
    earnedDate: "2024-03-10"
  },
  {
    id: 3,
    title: "Streak Champion",
    description: "Maintain a 30-day activity streak",
    icon: "🔥",
    earned: false,
    progress: 12,
    target: 30
  },
  {
    id: 4,
    title: "Water Guardian",
    description: "Complete all water conservation lessons",
    icon: "💧",
    earned: true,
    earnedDate: "2024-03-08"
  },
  {
    id: 5,
    title: "Zero Waste Hero",
    description: "Complete the Zero Waste Week challenge",
    icon: "♻️",
    earned: false,
    progress: 4,
    target: 7
  },
  {
    id: 6,
    title: "Knowledge Seeker",
    description: "Complete 50 quiz questions",
    icon: "📚",
    earned: false,
    progress: 32,
    target: 50
  }
];

const recentActivity = [
  { id: 1, activity: "Completed Air Quality Quiz", points: 50, date: "2 hours ago" },
  { id: 2, activity: "Finished Zero Waste Challenge Day 4", points: 25, date: "1 day ago" },
  { id: 3, activity: "Earned Quiz Master badge", points: 100, date: "3 days ago" },
  { id: 4, activity: "Started Water Conservation course", points: 10, date: "5 days ago" }
];

const suggestedChallenges = [
  {
    id: 1,
    title: "Energy Saver Week",
    description: "Reduce energy consumption by 30%",
    difficulty: "Medium",
    points: 300
  },
  {
    id: 2,
    title: "Plant-Based Diet",
    description: "Try plant-based meals for 5 days",
    difficulty: "Easy",
    points: 200
  },
  {
    id: 3,
    title: "Plastic-Free Shopping",
    description: "Shop without single-use plastics",
    difficulty: "Hard",
    points: 400
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);

  const levelProgress = (userProfile.experience / userProfile.experienceToNext) * 100;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar} alt="Profile" />
                  <AvatarFallback className="bg-gradient-nature text-white text-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {userProfile.level}
                </div>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(false)} variant="success">
                        Save Changes
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{userProfile.email}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Level {userProfile.level} Progress</span>
                        <span>{userProfile.experience}/{userProfile.experienceToNext} XP</span>
                      </div>
                      <Progress value={levelProgress} className="h-3" />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right space-y-2">
                <Badge variant="level" className="text-lg px-3 py-1">
                  Level {userProfile.level}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Joined {userProfile.joinDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center p-6">
                <Trophy className="w-8 h-8 mx-auto text-accent mb-2" />
                <div className="text-2xl font-bold text-accent">{userProfile.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </Card>
              <Card className="text-center p-6">
                <Target className="w-8 h-8 mx-auto text-success mb-2" />
                <div className="text-2xl font-bold text-success">
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </Card>
              <Card className="text-center p-6">
                <Leaf className="w-8 h-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold text-primary">{userProfile.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your environmental accomplishments and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`p-4 ${
                        achievement.earned 
                          ? 'bg-success/10 border-success/20 badge-glow' 
                          : 'opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          {achievement.earned ? (
                            <Badge variant="achievement">
                              Earned {achievement.earnedDate}
                            </Badge>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{achievement.progress}/{achievement.target}</span>
                              </div>
                              <Progress 
                                value={(achievement.progress! / achievement.target!) * 100} 
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-card-hover rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="success">+{activity.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Suggested Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Challenges</CardTitle>
                <CardDescription>
                  Based on your interests and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedChallenges.map((challenge) => (
                  <Card key={challenge.id} className="p-4">
                    <h4 className="font-semibold mb-2">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={
                          challenge.difficulty === "Easy" ? "success" :
                          challenge.difficulty === "Medium" ? "warning" : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                      <span className="text-sm font-medium">{challenge.points} pts</span>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Start Challenge
                    </Button>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5" />
                  Quick Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Notification Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Achievement History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}