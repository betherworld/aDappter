import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { Observable, of } from "rxjs";
import { Project, Emission } from "../org.energy.network";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
  // providers:[ProjectService]
})
export class ProjectsComponent {
  //projects = null;

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
      status: "open",
      src:
        "https://images.unsplash.com/photo-1536053414697-007fa93e0a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2712&q=80"
    },
    {
      projectTitle: "WeForest",
      projectDescription: "We encourage every company to reduce and avoid...",
      projectID: 1,
      projectBalance: 1000,
      tokensGoal: 2000,
      status: "open",
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
      status: "open",
      src:
        "https://images.unsplash.com/photo-1531254722074-92eebf4045ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
    },
    {
      projectTitle: "Recycling: Live a Sustainable Life",
      projectDescription: "If it cannot be reduced, reused or repaired...",
      projectID: 3,
      projectBalance: 800,
      tokensGoal: 1000,
      status: "open",
      src:
        "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
    },
    {
      projectTitle: "Electric Charger",
      projectDescription:
        "More charging stations for less gas emissions worldwide.",
      projectID: 4,
      projectBalance: 1800,
      tokensGoal: 10000,
      status: "open",
      src:
        "https://images.unsplash.com/photo-1516755538454-c8379d7a86aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
    },
    {
      projectTitle: "Public Transportation",
      projectDescription: "Electric cars, less fuel consumptions, less Co2...",
      projectID: 5,
      projectBalance: 5000,
      tokensGoal: 2500,
      status: "open",
      src:
        "https://images.unsplash.com/photo-1508720666804-4253e0d846f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80"
    }
  ];

  constructor(private projectservice: ProjectService) {
    /*  projectservice.getProjects().subscribe(projects => {
      this.projects = projects;
      this.projects.push({ projectTitle: "Save The Foxes", projectDescription: "Make life more foxy", projectID: 0, projectBalance:1000, tokensGoal: 1500,  status:"open", owner:"wwf" })
      console.log(projects);
    }); */
  }

  //  ngOnInit() {}
}
