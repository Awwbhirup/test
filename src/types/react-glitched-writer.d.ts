declare module 'react-glitched-writer' {
  import { ComponentType, HTMLAttributes } from 'react';

  export interface GlitchedWriterProps extends HTMLAttributes<HTMLElement> {
    text: string | string[];
    options?: any;
    wait?: number;
    queue?: any;
    onStep?: (text: string) => void;
    onEnd?: () => void;
  }

  const GlitchedWriter: ComponentType<GlitchedWriterProps>;
  export default GlitchedWriter;
}
