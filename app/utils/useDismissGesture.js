import { useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import {useAtom} from "jotai";
import {notificationsAtom} from "../utils/atoms";

export function useDismissGesture(id) {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(70);
    const [, setNotifications] = useAtom(notificationsAtom);

    const gestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = Math.max(-100, Math.min(0, event.translationX));
        },
        onEnd: () => {
            if (translateX.value < -50) {
                translateX.value = withSpring(-1000, { damping: 20, stiffness: 90 });
                itemHeight.value = withSpring(0, { damping: 20, stiffness: 90 }, (isFinished) => {
                    if (isFinished) {
                        // setNotifications((currentNotifications) =>
                        //     currentNotifications.filter((notification) => notification.id !== id)
                        // );
                    }
                });
            } else {
                translateX.value = withSpring(0);
            }
        },
    });

    return { translateX, itemHeight, gestureHandler };
}
