import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from 'expo-haptics';
import { useSettings } from "contexts/SettingContext";

type SoundType = "pop1" | "pop2" | "win" | "lose" | "draw"


export default function useSounds(): (sound: SoundType) => void{
    const {settings} = useSettings();
    const popSoundRef = useRef<Audio.Sound | null>(null)
    const pop2SoundRef = useRef<Audio.Sound | null>(null)
    const winSoundRef = useRef<Audio.Sound | null>(null)
    const drawSoundRef = useRef<Audio.Sound | null>(null)
    const lossSoundRef = useRef<Audio.Sound | null>(null) 

    const playSound = async (sound: SoundType): Promise<void>  => {
        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            lose: lossSoundRef,
            drawSoundRef: drawSoundRef
        }
        try {
            const status = await soundsMap[sound as keyof typeof soundsMap].current?.getStatusAsync();
            status && status.isLoaded && settings?.sounds && soundsMap[sound as keyof typeof soundsMap].current?.replayAsync();
            if(settings?.haptics){
                switch(sound){
                    case "pop1":
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        break;
                    case "pop2":
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        break
                    case "win":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        break;
                    case "lose":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        break;
                    case "draw":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        break;
                    default:
                        break;
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();
        const lossSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await popSoundObject.loadAsync(require('assets/pop_1.wav'))
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await pop2SoundObject.loadAsync(require('assets/pop_2.wav'))
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await winSoundObject.loadAsync(require('assets/win.mp3'))
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await drawSoundObject.loadAsync(require('assets/draw.mp3'))
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await lossSoundObject.loadAsync(require('assets/loss.mp3'))

            popSoundRef.current = popSoundObject
            pop2SoundRef.current = pop2SoundObject
            winSoundRef.current = winSoundObject
            drawSoundRef.current = drawSoundObject
            lossSoundRef.current = lossSoundObject
        }
        loadSounds();
        return () => {
            popSoundObject && popSoundObject.unloadAsync()
            pop2SoundObject && pop2SoundObject.unloadAsync()
            winSoundObject && winSoundObject.unloadAsync()
            drawSoundObject && drawSoundObject.unloadAsync()
            lossSoundObject && lossSoundObject.unloadAsync()
        }
     }, [])

      return playSound;
}