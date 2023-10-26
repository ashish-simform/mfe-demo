import React from "react";
type AppProps = {
  count: number;
};
const App: React.FC<AppProps> = ({ count }) => {
  return (
    <>
      <fieldset>
        <legend>MFE</legend>
        <h1>
          <center>App 2</center>
        </h1>
      </fieldset>
      Cart Count : {count}
    </>
  );
};

export default App;
