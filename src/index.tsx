import { AppBootstrap } from "components";
import { ReactElement } from "react";
import Navigator from "config/Navigator";
import {SettingsProvider} from "contexts/SettingContext";

export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </AppBootstrap>
  );
}
