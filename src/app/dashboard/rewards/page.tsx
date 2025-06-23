export default function RewardsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Rewards</h1>
      <p className="text-muted-foreground mb-8">
        Earn points for planting trees and redeem them for exclusive rewards.
      </p>

      <div className="bg-card rounded-lg border shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Your Reward Points</h3>
            <p className="text-muted-foreground text-sm">Plant more trees to earn more points</p>
          </div>
          <div className="bg-primary/10 text-primary font-bold text-3xl px-6 py-3 rounded-lg">
            840 Points
          </div>
        </div>
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: "77%" }}></div>
          </div>
          <p className="text-right text-sm text-muted-foreground mt-2">250 points until next reward tier</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-6">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: "Eco-friendly Water Bottle",
            points: 500,
            description: "Reusable stainless steel water bottle with Vanam logo.",
            available: true
          },
          {
            id: 2,
            name: "Organic Cotton T-Shirt",
            points: 750,
            description: "100% organic cotton t-shirt with 'Tree Planter' design.",
            available: true
          },
          {
            id: 3,
            name: "Tree Planting Kit",
            points: 1000,
            description: "Kit includes 5 saplings, tools, and planting guide.",
            available: false
          },
          {
            id: 4,
            name: "Bamboo Bottle",
            points: 600,
            description: "Sustainable bamboo water bottle for eco-conscious hydration.",
            available: true
          },
          {
            id: 5,
            name: "Cotton Tote Bag",
            points: 450,
            description: "Reusable organic cotton shopping bag for plastic-free shopping.",
            available: true
          },
          {
            id: 6,
            name: "Bamboo Cutlery Set",
            points: 550,
            description: "Portable bamboo utensils set for sustainable dining on the go.",
            available: true
          }
        ].map((reward) => (
          <div key={reward.id} className="bg-card rounded-lg border shadow overflow-hidden">
            <div className="bg-muted h-32 flex items-center justify-center">
              <div className="text-4xl">🎁</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{reward.name}</h3>
                <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                  {reward.points} Points
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
              <button 
                className={`w-full py-2 rounded font-medium ${
                  reward.available
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                disabled={!reward.available}
              >
                {reward.available ? "Redeem Reward" : `Need ${reward.points - 840} more points`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 