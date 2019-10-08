import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./activityEntryListing.css";

class ActivityEntryListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityEntries: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(
        process.env.REACT_APP_ACTIVITY_ENTRY_SERVICE +
          "/activityentry/" +
          this.props.activityID
      )
      .then(response => {
        this.setState({
          activityEntries: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Comment", accessor: "comments" }
    ];

    return !this.state.activityEntries ? (
      <div> Loading... </div>
    ) : (
      <div className="listContainer">
        Submissions for{" "}
        {
          this.props.activities.filter(
            activity => activity.id === this.props.activityID
          )[0].description
        } Activity
        <ReactTable data={this.state.activityEntries} columns={columns} />
      </div>
    );
  }
}

export default ActivityEntryListing;
