import React from "react";
import axios from "axios";
import Error from "./error";
import "./activityInput.css";

class ActivityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      activityID: this.props.activities[0].id,
      comments: "",
      errors: ""
    };
  }

  handleChange_FirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  handleChange_LastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChange_Email = event => {
    this.setState({ email: event.target.value });
  };

  handleChange_Activity = event => {
    this.setState({ activityID: event.target.value });
  };

  handleChange_Comments = event => {
    this.setState({ comments: event.target.value });
  };

  submitEntry = event => {
    let { firstName, lastName, email, activityID, comments } = this.state;

    axios
      .post(process.env.REACT_APP_ACTIVITY_ENTRY_SERVICE + "/activityentry", {
        firstName,
        lastName,
        email,
        activityID: Number(activityID),
        comments
      })
      .then(response => {
        this.props.successfulEntry(Number(activityID));
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({ errors: error.response.data.errors });
        } else {
          console.log(error);
        }
      });
  };

  render() {
    return (
      <div className="innerContainer">
        Please make the selection for which activity you would like.
        <div className="inputContainer">
          <div className="formlabel">First Name : </div>
          <div>
            <input
              type="text"
              name="First Name"
              value={this.state.firstName}
              onChange={this.handleChange_FirstName}
              className="inputField"
            />
          </div>
          <Error errors={this.state.errors.FirstName} />
        </div>
        <div className="inputContainer">
          <div className="formlabel">Last Name : </div>
          <div>
            <input
              type="text"
              name="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange_LastName}
              className="inputField"
            />
          </div>
          <Error errors={this.state.errors.LastName} />
        </div>
        <div className="inputContainer">
          <div className="formlabel">Email Address :</div>
          <div>
            <input
              type="text"
              name="Email Address"
              value={this.state.email}
              onChange={this.handleChange_Email}
              className="inputField"
            />
          </div>
          <Error errors={this.state.errors.Email} />
        </div>
        <div className="inputContainer">
          <div className="formlabel">Activity : </div>
          <div>
            <select
              value={this.state.activityID}
              onChange={this.handleChange_Activity}
              className="inputField"
            >
              {this.props.activities.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.description}
                </option>
              ))}
            </select>
          </div>
          <Error errors={this.state.errors.ActivityID} />
        </div>
        <div className="inputContainer">
          <div className="formlabel">Comments : </div>
          <div>
            <input
              type="text"
              name="Comments"
              value={this.state.comments}
              onChange={this.handleChange_Comments}
              className="inputField"
            />
          </div>
          <Error errors={this.state.errors.Comments} />
        </div>
        <div>
          <button onClick={this.submitEntry}>Submit</button>
        </div>
      </div>
    );
  }
}

export default ActivityInput;
