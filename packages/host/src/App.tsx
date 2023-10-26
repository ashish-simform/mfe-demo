import React, { useState } from "react";
import { SuspenseErrorBoundary } from "./components/SuspenseErrorBoundary";
//@ts-ignore
const App1 = React.lazy(() => import("app1/App"));
//@ts-ignore
const App2 = React.lazy(() => import("app2/App"));
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>
        <center>Host App</center>
      </h1>
      <SuspenseErrorBoundary>
        <App1 />
      </SuspenseErrorBoundary>
      <SuspenseErrorBoundary>
        <App2 count={count} />
      </SuspenseErrorBoundary>
      <br />
      <button onClick={() => setCount(prev => prev + 1)}>Add To Cart</button>
    </>
  );
};

export default App;
