import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutComponent } from "./layout/layout.component";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { routes } from "./routes/routes";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
