//Importamos las fuentes a utilizar
import {FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import {Jost_100Thin, Jost_300Light, Jost_400Regular, Jost_500Medium, Jost_600SemiBold, Jost_700Bold, Jost_800ExtraBold} from "@expo-google-fonts/jost";
import { useFonts } from "expo-font";

const Fonts = () => {
    //Colocamos las fuentes que vamos a utilizar
    const [fontsLoaded] = useFonts({
        FredokaOne_400Regular,
        Jost_100Thin,
        Jost_300Light,
        Jost_400Regular,
        Jost_500Medium,
        Jost_600SemiBold,
        Jost_700Bold,
        Jost_800ExtraBold
    });

};

export default Fonts;