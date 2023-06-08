import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";

import AppLoading from "expo-app-loading";
import { ReactNode, useEffect, useState } from "react";
import { Auth } from "aws-amplify"
import { useAuth } from "contexts/AuthContext";

type AppBootstrapProps = {
  children: ReactNode;
};


export default function AppBootstrap({ children }: AppBootstrapProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { setUser } = useAuth();
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });

  useEffect(() => {
    async function checkCurrentUser(){
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        setUser(user);
      } catch(err){
        setUser(null);
      }
      setIsLogin(true);
    }
    checkCurrentUser();
  }, []);
  return fontLoaded && isLogin ? <>{children}</> : <AppLoading />;
}
