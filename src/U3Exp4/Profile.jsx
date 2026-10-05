import React from "react";
import Common from "./Common";

function Profile({
  user,
  applications,
  savedJobs
}) {

  return (
    <>
      <Common user={user} />

      <main className="profile-page">

        <div className="profile-header">

          <div className="big-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="eyebrow">
              YOUR PROFILE
            </p>

            <h1>{user.name}</h1>

            <p>{user.email}</p>
          </div>

        </div>

        <div className="profile-stats">

          <div>
            <strong>
              {applications.length}
            </strong>
            <span>Applications</span>
          </div>

          <div>
            <strong>
              {savedJobs.length}
            </strong>
            <span>Saved Jobs</span>
          </div>

          <div>
            <strong>85%</strong>
            <span>Profile Strength</span>
          </div>

        </div>

        <div className="profile-card">

          <h2>Profile completion</h2>

          <div className="profile-progress">
            <div></div>
          </div>

          <p>
            Your profile is 85% complete.
            Add more information to improve your
            job matches.
          </p>

        </div>

      </main>
    </>
  );
}

export default Profile;