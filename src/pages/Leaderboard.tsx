import { useState } from "react";
import { Trophy, Medal, Crown, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const globalLeaderboard = [
  {
    id: 1,
    rank: 1,
    name: "Emma Rodriguez",
    points: 4250,
    level: 12,
    badges: 15,
    streak: 45,
    avatar: "/api/placeholder/50/50",
    country: "🇪🇸",
    weeklyGain: 320
  },
  {
    id: 2,
    rank: 2,
    name: "Kai Tanaka",
    points: 3980,
    level: 11,
    badges: 13,
    streak: 32,
    avatar: "/api/placeholder/50/50",
    country: "🇯🇵",
    weeklyGain: 285
  },
  {
    id: 3,
    rank: 3,
    name: "Aisha Patel",
    points: 3750,
    level: 11,
    badges: 12,
    streak: 28,
    avatar: "/api/placeholder/50/50",
    country: "🇮🇳",
    weeklyGain: 240
  },
  {
    id: 4,
    rank: 4,
    name: "Marco Silva",
    points: 3420,
    level: 10,
    badges: 11,
    streak: 25,
    avatar: "/api/placeholder/50/50",
    country: "🇧🇷",
    weeklyGain: 195
  },
  {
    id: 5,
    rank: 5,
    name: "Sophie Chen",
    points: 3180,
    level: 9,
    badges: 9,
    streak: 22,
    avatar: "/api/placeholder/50/50",
    country: "🇨🇦",
    weeklyGain: 180
  },
  // Current user
  {
    id: 6,
    rank: 15,
    name: "Alex Chen",
    points: 2850,
    level: 7,
    badges: 6,
    streak: 12,
    avatar: "/api/placeholder/50/50",
    country: "🇺🇸",
    weeklyGain: 165,
    isCurrentUser: true
  }
];

const friendsLeaderboard = [
  {
    id: 1,
    rank: 1,
    name: "Sarah Johnson",
    points: 3100,
    level: 8,
    badges: 8,
    streak: 18,
    avatar: "/api/placeholder/50/50",
    weeklyGain: 220
  },
  {
    id: 2,
    rank: 2,
    name: "Alex Chen",
    points: 2850,
    level: 7,
    badges: 6,
    streak: 12,
    avatar: "/api/placeholder/50/50",
    weeklyGain: 165,
    isCurrentUser: true
  },
  {
    id: 3,
    rank: 3,
    name: "Mike Wilson",
    points: 2650,
    level: 6,
    badges: 5,
    streak: 8,
    avatar: "/api/placeholder/50/50",
    weeklyGain: 145
  },
  {
    id: 4,
    rank: 4,
    name: "Lisa Anderson",
    points: 2420,
    level: 6,
    badges: 4,
    streak: 15,
    avatar: "/api/placeholder/50/50",
    weeklyGain: 130
  }
];

const weeklyTopPerformers = [
  { name: "Emma Rodriguez", weeklyGain: 320, avatar: "/api/placeholder/40/40" },
  { name: "Kai Tanaka", weeklyGain: 285, avatar: "/api/placeholder/40/40" },
  { name: "Aisha Patel", weeklyGain: 240, avatar: "/api/placeholder/40/40" }
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("all-time");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const LeaderboardTable = ({ data, showCountry = false }: { data: any[], showCountry?: boolean }) => (
    <div className="space-y-2">
      {data.map((user) => (
        <Card 
          key={user.id} 
          className={`p-4 transition-[var(--transition-smooth)] hover:shadow-lg ${
            user.isCurrentUser ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {getRankIcon(user.rank)}
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-nature text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold truncate">
                    {user.name}
                    {user.isCurrentUser && <span className="text-primary"> (You)</span>}
                  </h4>
                  {showCountry && <span>{user.country}</span>}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Level {user.level}</span>
                  <span>{user.badges} badges</span>
                  <span>{user.streak} day streak</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{user.points.toLocaleString()}</div>
              <div className="text-sm text-success">+{user.weeklyGain} this week</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-success text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leaderboard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              See how you rank among eco-champions worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6">
            <Users className="w-8 h-8 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">12,847</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </Card>
          <Card className="text-center p-6">
            <Trophy className="w-8 h-8 mx-auto text-accent mb-2" />
            <div className="text-2xl font-bold text-accent">4,250</div>
            <div className="text-sm text-muted-foreground">Top Score</div>
          </Card>
          <Card className="text-center p-6">
            <TrendingUp className="w-8 h-8 mx-auto text-success mb-2" />
            <div className="text-2xl font-bold text-success">15th</div>
            <div className="text-sm text-muted-foreground">Your Rank</div>
          </Card>
          <Card className="text-center p-6">
            <Calendar className="w-8 h-8 mx-auto text-earth mb-2" />
            <div className="text-2xl font-bold text-earth">2,850</div>
            <div className="text-sm text-muted-foreground">Your Points</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="global" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button
                    variant={timeframe === "all-time" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("all-time")}
                  >
                    All Time
                  </Button>
                  <Button
                    variant={timeframe === "weekly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("weekly")}
                  >
                    This Week
                  </Button>
                  <Button
                    variant={timeframe === "monthly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("monthly")}
                  >
                    This Month
                  </Button>
                </div>
              </div>

              <TabsContent value="global" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Global Leaderboard
                    </CardTitle>
                    <CardDescription>
                      Top environmental champions from around the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LeaderboardTable data={globalLeaderboard} showCountry />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="friends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Friends Leaderboard
                    </CardTitle>
                    <CardDescription>
                      Compete with your friends and connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LeaderboardTable data={friendsLeaderboard} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Stars</CardTitle>
                <CardDescription>
                  Biggest point gainers this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyTopPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={performer.avatar} alt={performer.name} />
                        <AvatarFallback className="bg-gradient-nature text-white text-xs">
                          {performer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{performer.name}</p>
                      <p className="text-xs text-success">+{performer.weeklyGain} points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Rank</span>
                    <span className="font-semibold">#15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points to next rank</span>
                    <span className="font-semibold text-primary">120</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>This week's gain</span>
                    <span className="font-semibold text-success">+165</span>
                  </div>
                </div>
                <Button className="w-full" variant="hero">
                  View Detailed Stats
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Showcase */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <p className="text-sm font-medium">Quiz Master</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💧</div>
                  <div>
                    <p className="text-sm font-medium">Water Guardian</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌱</div>
                  <div>
                    <p className="text-sm font-medium">Eco Warrior</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}