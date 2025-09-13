import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "What is the most effective way to reduce your carbon footprint?",
    options: [
      "Taking shorter showers",
      "Using public transportation or walking",
      "Turning off lights when leaving a room",
      "Recycling paper products"
    ],
    correctAnswer: 1,
    explanation: "Transportation accounts for about 29% of greenhouse gas emissions. Using public transport, walking, or cycling significantly reduces your carbon footprint."
  },
  {
    id: 2,
    question: "Which of these materials takes the longest to decompose in a landfill?",
    options: [
      "Paper",
      "Food waste",
      "Plastic bottles", 
      "Cardboard"
    ],
    correctAnswer: 2,
    explanation: "Plastic bottles can take 450-1000 years to decompose, while paper takes 2-6 weeks, food waste takes 1-6 months, and cardboard takes 2 months."
  },
  {
    id: 3,
    question: "What percentage of the Earth's water is freshwater available for human use?",
    options: [
      "10%",
      "5%",
      "Less than 1%",
      "15%"
    ],
    correctAnswer: 2,
    explanation: "Only about 0.3% of the Earth's water is freshwater available for human use. Most water is saltwater in oceans, and much freshwater is frozen in ice caps."
  },
  {
    id: 4,
    question: "Which renewable energy source is most efficient?",
    options: [
      "Solar panels",
      "Wind turbines",
      "Hydroelectric dams",
      "Geothermal energy"
    ],
    correctAnswer: 2,
    explanation: "Hydroelectric dams are typically the most efficient renewable energy source, with efficiency rates of 80-90%, compared to solar (15-22%) and wind (35-45%)."
  },
  {
    id: 5,
    question: "What is the main cause of ocean acidification?",
    options: [
      "Industrial waste",
      "Oil spills",
      "Carbon dioxide absorption",
      "Plastic pollution"
    ],
    correctAnswer: 2,
    explanation: "Ocean acidification is primarily caused by the ocean absorbing excess CO2 from the atmosphere, which forms carbonic acid and lowers the pH of seawater."
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer || -1;
    setUserAnswers(newAnswers);

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're an eco-champion!", color: "success" };
    if (percentage >= 60) return { message: "Good job! Keep learning!", color: "warning" };
    return { message: "Keep studying and try again!", color: "destructive" };
  };

  if (quizCompleted) {
    const scoreData = getScoreMessage();
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <CardHeader>
              <Trophy className="w-16 h-16 mx-auto text-accent mb-4" />
              <CardTitle className="text-3xl mb-4">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score}/{quizQuestions.length}
              </div>
              <Badge variant={scoreData.color as any} className="text-lg px-4 py-2">
                {scoreData.message}
              </Badge>
              <div className="max-w-2xl mx-auto">
                <Progress value={(score / quizQuestions.length) * 100} variant="success" className="h-6" />
                <p className="text-muted-foreground mt-2">
                  {Math.round((score / quizQuestions.length) * 100)}% Correct
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={restartQuiz} variant="hero" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg">
                  View Explanations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const isAnswerCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Environmental Quiz</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className={timeLeft <= 10 ? "text-destructive font-bold" : ""}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonVariant = "outline";
              let iconElement = null;

              if (showResult) {
                if (index === currentQ.correctAnswer) {
                  buttonVariant = "success";
                  iconElement = <CheckCircle className="w-5 h-5" />;
                } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                  buttonVariant = "destructive";
                  iconElement = <XCircle className="w-5 h-5" />;
                }
              } else if (selectedAnswer === index) {
                buttonVariant = "default";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant as any}
                  className="w-full justify-between text-left h-auto p-4"
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span>{option}</span>
                  {iconElement}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Explanation */}
        {showResult && (
          <Card className="mb-6 animate-fade-in-up">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                {isAnswerCorrect ? (
                  <CheckCircle className="w-6 h-6 text-success mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive mt-1" />
                )}
                <div>
                  <h4 className="font-semibold mb-2">
                    {isAnswerCorrect ? "Correct!" : "Incorrect"}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        {!showResult && (
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              variant="quiz"
              size="lg"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}

        {/* Score Display */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Current Score: <span className="font-semibold text-primary">{score}/{currentQuestion + (showResult ? 1 : 0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}