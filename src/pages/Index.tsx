import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  BookOpen, 
  Target, 
  Trophy, 
  Zap, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  PlayCircle
} from "lucide-react";

// Import hero image
import heroImage from "@/assets/hero-environment.jpg";

const Index = () => {
  const userStats = {
    level: 7,
    points: 2850,
    streak: 12,
    badges: 6,
    rank: 15,
    progress: 75
  };

  const recentAchievements = [
    { icon: "🧠", name: "Quiz Master", date: "3 days ago" },
    { icon: "💧", name: "Water Guardian", date: "1 week ago" },
    { icon: "🌱", name: "Eco Warrior", date: "2 weeks ago" }
  ];

  const quickActions = [
    {
      title: "Take a Quiz",
      description: "Test your environmental knowledge",
      href: "/quiz",
      icon: Zap,
      color: "quiz",
      gradient: "bg-gradient-earth"
    },
    {
      title: "Learn Topics",
      description: "Explore interactive lessons",
      href: "/learn",
      icon: BookOpen,
      color: "default",
      gradient: "bg-gradient-nature"
    },
    {
      title: "Join Challenges",
      description: "Take on eco-friendly tasks",
      href: "/challenges",
      icon: Target,
      color: "earth",
      gradient: "bg-gradient-success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Learn. Play.
              <span className="block text-accent">Protect the Earth.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join thousands of eco-champions in making environmental education fun and engaging. 
              Earn points, unlock achievements, and build sustainable habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/quiz">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/learn">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Topics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* User Stats Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Progress</h2>
            <p className="text-xl text-muted-foreground">Track your environmental learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center p-6 card-interactive">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{userStats.points.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </Card>

            <Card className="text-center p-6 card-interactive">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-success mb-2">#{userStats.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </Card>

            <Card className="text-center p-6 card-interactive">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">{userStats.badges}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </Card>

            <Card className="text-center p-6 card-interactive">
              <div className="w-12 h-12 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-earth" />
              </div>
              <div className="text-3xl font-bold text-earth mb-2">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Level {userStats.level} Progress</h3>
                <p className="text-sm text-muted-foreground">Keep learning to reach the next level!</p>
              </div>
              <Badge variant="level" className="text-base px-3 py-1">
                Level {userStats.level}
              </Badge>
            </div>
            <Progress value={userStats.progress} className="h-4 mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{userStats.progress}% Complete</span>
              <span>Next level at 100%</span>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Actions</h2>
            <p className="text-xl text-muted-foreground">Jump into your learning adventure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.title} className="card-interactive hover-scale">
                  <div className={`${action.gradient} p-6 rounded-t-lg`}>
                    <Icon className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                    <p className="text-white/90">{action.description}</p>
                  </div>
                  <CardContent className="p-6">
                    <Button variant="outline" className="w-full group" asChild>
                      <Link to={action.href}>
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Celebrate your latest environmental accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg badge-glow"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6" asChild>
                <Link to="/profile">
                  View All Achievements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Community Stats */}
        <section>
          <Card className="text-center p-8 bg-gradient-nature text-white">
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Users className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">12,847</div>
                <div className="text-white/80">Active Learners</div>
              </div>
              <div>
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">89,432</div>
                <div className="text-white/80">Lessons Completed</div>
              </div>
              <div>
                <Target className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">5,621</div>
                <div className="text-white/80">Challenges Finished</div>
              </div>
            </div>
            <Button variant="accent" size="lg" className="mt-8" asChild>
              <Link to="/leaderboard">
                View Leaderboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
