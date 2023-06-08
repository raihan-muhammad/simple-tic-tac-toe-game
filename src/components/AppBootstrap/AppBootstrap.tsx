import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";

import AppLoading from "expo-app-loading";
import { ReactNode, useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify"
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

    function hubListener(hubData: any){
      const { data, event} = hubData.payload;
      switch(event){
        case "signOut":
          setUser(null);
          break;
        case "signIn":
          setUser(data);
          break;
        default:
          break;
      }
    }

    Hub.listen("auth", hubListener);

    return () => {
      Hub.remove("auth", hubListener);
    }

  }, []);
  return fontLoaded && isLogin ? <>{children}</> : <AppLoading />;
}
