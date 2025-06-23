export default function TreeHealthPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Tree Health</h1>
      <p className="text-muted-foreground mb-8">
        Monitor the health and growth of your planted trees.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: "Oak Tree #1",
            location: "City Park",
            plantedDate: "March 12, 2023",
            status: "Healthy",
            height: "1.2 meters",
            lastCheck: "July 15, 2023"
          },
          {
            id: 2,
            name: "Pine Tree #3",
            location: "Mountain Trail",
            plantedDate: "May 5, 2023",
            status: "Needs Attention",
            height: "0.8 meters",
            lastCheck: "July 10, 2023"
          },
          {
            id: 3,
            name: "Maple Tree #2",
            location: "Riverside",
            plantedDate: "April 22, 2023",
            status: "Healthy",
            height: "1.0 meters",
            lastCheck: "July 12, 2023"
          },
          {
            id: 4,
            name: "Oak Tree #4",
            location: "Community Garden",
            plantedDate: "June 18, 2023",
            status: "Healthy",
            height: "0.5 meters",
            lastCheck: "July 20, 2023"
          },
          {
            id: 5,
            name: "Pine Tree #5",
            location: "School Yard",
            plantedDate: "May 30, 2023",
            status: "Healthy",
            height: "0.6 meters",
            lastCheck: "July 18, 2023"
          },
          {
            id: 6,
            name: "Birch Tree #1",
            location: "Front Yard",
            plantedDate: "April 5, 2023",
            status: "Needs Water",
            height: "0.9 meters",
            lastCheck: "July 14, 2023"
          }
        ].map((tree) => (
          <div key={tree.id} className="bg-card rounded-lg border shadow">
            <div className={`p-4 border-b ${
              tree.status === "Healthy" 
                ? "bg-green-100 text-green-800" 
                : "bg-amber-100 text-amber-800"
            }`}>
              <h3 className="font-medium">{tree.name}</h3>
              <p className="text-sm">{tree.location}</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Planted:</span>
                <span className="text-sm">{tree.plantedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className={`text-sm font-medium ${
                  tree.status === "Healthy" 
                    ? "text-green-600"
                    : "text-amber-600"
                }`}>{tree.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Height:</span>
                <span className="text-sm">{tree.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Check:</span>
                <span className="text-sm">{tree.lastCheck}</span>
              </div>
            </div>
            <div className="p-4 border-t">
              <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 rounded transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 