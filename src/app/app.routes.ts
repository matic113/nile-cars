import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    // Redirect from the root path '' to 'home' to ensure the app starts with the home page
    { path: '', redirectTo: 'home', pathMatch: "full" },

    // Define the '/home' route and load the HomeComponent
    { path: 'home', component: HomeComponent },

    // Define the '/register' route and load the RegisterComponent
    { path: 'signup', component: SignupComponent },

    // Define the '/log-in' route and load the LogInComponent
    { path:'log-in', component: LogInComponent },
 // Define the '/log-in' route and load the LogInComponent
 { path:'search', component: SearchComponent },
    // Catch-all route for undefined paths, displaying the NotFoundComponent (404 error page)
    { path: "**", component: NotFoundComponent }
];
