"use client";

import useSound from "use-sound";

export function useCyberSound() {
  const [playHover] = useSound("/assets/audio/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/assets/audio/click.mp3", { volume: 0.7 });
  const [playSuccess] = useSound("/assets/audio/success.mp3", { volume: 0.6 });

  return {
    playHover,
    playClick,
    playSuccess
  };
}
