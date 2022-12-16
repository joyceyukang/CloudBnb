import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/AllSpots";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import SingleSpot from "./components/SingleSpot/SingleSpot";
import EditSpot from "./components/EditSpot/EditSpot";
import { getSpots } from "./store/spotReducer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={AllSpots}/>
          <Route path='/spots/new' component={CreateSpot} />
          <Route exact path='/spots/:spotId' component={SingleSpot} />
          <Route exact path='/spots/:spotId/edit' component={EditSpot} />
        </Switch>
      )}
    </>
  );
}

export default App;