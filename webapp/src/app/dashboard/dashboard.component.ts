import { Component } from "@angular/core";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
  // providers: [DashboardService]
})
export class DashboardComponent {
  projects = [
    {
      projectTitle: "Water Charity",
      long:
        "Water Charity, a 501(c)(3) nonprofit dedicated to helping people access clean drinking water and improved sanitation. In our 11+ years, Water Charity has done more than 4,400 water, sanitation and public health projects in 77 countries, benefiting more than 4.5 million people!With our unique and extremely efficient method of operation, and an exemplary, transparent track record of sustainable,effective projects, you will be hard pressed to find any charity, in any field, that can match our accomplishments.Water Charity is a partner of the National Peace Corps Association.",
      projectDescription:
        "Water Charity, a 501(c)(3) nonprofit dedicated to...",
      projectID: 0,
      projectBalance: 1500,
      tokensGoal: 1000,
      status: 50,
      src:
        "https://images.unsplash.com/photo-1536053414697-007fa93e0a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2712&q=80"
    },
    {
      projectTitle: "WeForest",
      projectDescription: "We encourage every company to reduce and avoid...",
      projectID: 1,
      projectBalance: 1000,
      tokensGoal: 2000,
      status: 45,
      src:
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
    },
    {
      projectTitle: "Pledge to Save the Bees",
      projectDescription:
        "Believe it or not, you have a bee to thank for every...",
      projectID: 2,
      projectBalance: 750,
      tokensGoal: 500,
      status: 20,
      src:
        "https://images.unsplash.com/photo-1531254722074-92eebf4045ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
    }
  ];
  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: { min: 80, max: 140 },
          scaleLabel: {
            display: true,
            labelString: "Oil consumptions (Liters)"
          }
        }
      ]
    }
  };
  public barChartLabels = ["Nov", "Dec", "Jan"];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    {
      data: [123, 121, 117],
      label: "Baseline",
      type: "bar"
    },
    { data: [124, 107, 98], label: "Your monthly consumption", type: "bar" },
    { data: [125, 122, 120], label: "Swiss average consumption", type: "bar" }
  ];
  public barChartColors = [];

  emissions = [];
  tokens = [];
  id;

  constructor(private dashboardservice: DashboardService) {
    this.id = localStorage.getItem("id");
    /*this.dashboardservice.getEmissions().subscribe(emissions => {
      for(let e of emissions){
        if(e.owner == this.id){
          this.emissions.push(e);
        }
      }
    });
    this.dashboardservice.getTokens(this.id).subscribe(tokens => {
      this.tokens = tokens;
    });*/
  }
}
