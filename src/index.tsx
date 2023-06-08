import { AppBootstrap } from "components";
import { ReactElement } from "react";
import Navigator from "config/Navigator";
import { SettingsProvider } from "contexts/SettingContext";
import { Amplify } from "aws-amplify";
import config from './aws-exports';
import { AuthProvider } from "contexts/AuthContext";

Amplify.configure(config);

export default function App(): ReactElement {
  return (
    <AuthProvider>
      <AppBootstrap>
        <SettingsProvider>
          <Navigator />
        </SettingsProvider>
      </AppBootstrap>
    </AuthProvider>
  );
}
