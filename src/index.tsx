import { AppBootstrap } from "components";
import { ReactElement } from "react";
import Navigator from "config/Navigator";

export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <Navigator />
    </AppBootstrap>
  );
}
