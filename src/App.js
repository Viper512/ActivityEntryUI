import React from "react";
import "./App.css";
import ActivityInput from "./activityInput";
import ActivityEntryListing from "./activityEntryListing";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      successfulEntry: false,
      activityID: 0
    };
  }

  successfulEntry = (activityID) => {
    this.setState({ successfulEntry: true, activityID });
  };

  componentDidMount = () => {
    axios
      .get(process.env.REACT_APP_ACTIVITY_ENTRY_SERVICE + "/activity")
      .then(response => {
        this.setState({
          activities: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        {!this.state.successfulEntry ? (
          !this.state.activities ? (
            <div> Loading... </div>
          ) :(<ActivityInput successfulEntry={this.successfulEntry} activities={this.state.activities}/>)
        ) : (
          <ActivityEntryListing activityID={this.state.activityID} activities={this.state.activities}/>
        )}
      </div>
    );
  }
}

export default App;
