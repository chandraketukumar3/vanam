export default function LeaderboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Leaderboard</h1>
      <p className="text-muted-foreground mb-8">
        See who's making the biggest impact in tree planting around the world.
      </p>
      
      <div className="bg-card rounded-lg border shadow overflow-hidden">
        <div className="grid grid-cols-12 font-medium p-4 border-b bg-muted/50">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-center">Trees</div>
          <div className="col-span-2 text-center">CO₂ Impact</div>
          <div className="col-span-2 text-center">Points</div>
        </div>
        
        {/* Sample leaderboard entries */}
        {[
          { rank: 1, name: "Aarav Sharma", trees: 104, co2: "5.2 tons", points: 2080 },
          { rank: 2, name: "Priya Patel", trees: 87, co2: "4.3 tons", points: 1740 },
          { rank: 3, name: "Vikram Singh", trees: 73, co2: "3.6 tons", points: 1460 },
          { rank: 4, name: "Ananya Desai", trees: 68, co2: "3.4 tons", points: 1360 },
          { rank: 5, name: "Arjun Mehta", trees: 56, co2: "2.8 tons", points: 1120 },
          { rank: 6, name: "You", trees: 42, co2: "2.4 tons", points: 840, isUser: true },
          { rank: 7, name: "Kavya Reddy", trees: 39, co2: "1.9 tons", points: 780 },
          { rank: 8, name: "Rohan Kapoor", trees: 34, co2: "1.7 tons", points: 680 },
          { rank: 9, name: "Neha Gupta", trees: 28, co2: "1.4 tons", points: 560 },
          { rank: 10, name: "Ishaan Joshi", trees: 21, co2: "1.0 tons", points: 420 },
        ].map((entry) => (
          <div 
            key={entry.rank} 
            className={`grid grid-cols-12 p-4 border-b ${entry.isUser ? "bg-primary/10" : ""} hover:bg-muted/30 transition-colors`}
          >
            <div className="col-span-1 text-center font-medium">{entry.rank}</div>
            <div className="col-span-5 font-medium">{entry.name}</div>
            <div className="col-span-2 text-center">{entry.trees}</div>
            <div className="col-span-2 text-center">{entry.co2}</div>
            <div className="col-span-2 text-center">{entry.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 