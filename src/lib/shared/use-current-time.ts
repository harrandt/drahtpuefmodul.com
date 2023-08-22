import { DateTime } from 'luxon';
import create from 'zustand';

const useStore = create<{ time: DateTime; update: (time?: DateTime) => void }>((set) => ({
    time: DateTime.now(),
    update: (time = DateTime.now()) => set({ time }),
}));

const interval = 1000;
const handle = setInterval(() => {
    useStore.getState().update();
}, interval);

if (import.meta.hot) {
    import.meta.hot.accept(() => clearInterval(handle));
}

export const useCurrentTime = () => {
    return useStore(({ time }) => time);
};
