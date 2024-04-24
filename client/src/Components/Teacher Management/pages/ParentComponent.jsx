 // ParentComponent.jsx

import React from "react";
import ResetPassword from "./ResetPassword";

const ParentComponent = () => {
  // Mock token, replace with actual token logic
  const token = "be4e8ec168155fa9ceb6c65b5cf48e4b8ad386dc";

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
};

export default ParentComponent;
 