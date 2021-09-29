import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {Announcements} from "./components/Announcements/Announcements";
import {AnnouncementDetails} from "./components/AnnouncementDetails/AnnouncementDetails";
import {Header} from "./components/Header/Header";
import {Home} from "./components/Home/Home";
import {Search} from "./components/Search/Search";
import {routes} from "./constants";

import './App.css';


function App() {
    return (
        <div className="app">
            <Router>
                <Header/>
                <Switch>
                    <Route path={routes.home} component={Home}/>
                    <Route exact path={routes.announcements} component={Announcements}/>
                    <Route exact path={`${routes.announcements}/:id`} component={AnnouncementDetails}/>
                    <Route path={routes.search} component={Search}/>
                    <Redirect from="/" to={routes.home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
