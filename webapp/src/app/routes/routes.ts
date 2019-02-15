import { LoginComponent } from "../login/login.component";
import { LayoutComponent } from "../layout/layout.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ProjectDetailsComponent } from "../project-details/project-details.component";

export const routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "projects/:id", component: ProjectDetailsComponent }
    ]
  },
  { path: "login", component: LoginComponent }
  // { path: '', redirectTo: 'login', pathMatch: 'full' }
];
