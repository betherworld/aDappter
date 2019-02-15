import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../project.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"]
  // providers:[ProjectService]
})
export class ProjectDetailsComponent implements OnInit {
  id = null;
  project = {
    projectTitle: "Water Charity",
    long:
      "Water Charity, a 501(c)(3) nonprofit dedicated to helping people access clean drinking water and improved sanitation. In our 11+ years, Water Charity has done more than 4,400 water, sanitation and public health projects in 77 countries, benefiting more than 4.5 million people!With our unique and extremely efficient method of operation, and an exemplary, transparent track record of sustainable,effective projects, you will be hard pressed to find any charity, in any field, that can match our accomplishments.Water Charity is a partner of the National Peace Corps Association.",
    projectDescription: "Water Charity, a 501(c)(3) nonprofit dedicated to...",
    projectID: 0,
    projectBalance: 1500,
    tokensGoal: 10000,
    status: "open",
    src:
      "https://images.unsplash.com/photo-1536053414697-007fa93e0a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2712&q=80"
  };
  constructor(
    private route: ActivatedRoute,
    private projectservice: ProjectService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    // projectservice.getSpecificProject(this.id).subscribe(project => {
    //   this.project = project;
    //   console.log(project);
    // });
  }

  ngOnInit() {}
}
