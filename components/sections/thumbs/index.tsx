import * as React from "react";
import { BrandGuidelinesThumb } from "./BrandGuidelinesThumb";
import { LetterClashThumb } from "./LetterClashThumb";
import { DealRoomThumb } from "./DealRoomThumb";
import { SparrowThumb } from "./SparrowThumb";

export type ThumbProps = { hovered: boolean };
export type ThumbComponent = React.ComponentType<ThumbProps>;

export const projectThumbs: Record<string, ThumbComponent | undefined> = {
  "hm-brand-guidelines": BrandGuidelinesThumb,
  "letter-clash": LetterClashThumb,
  "deal-room": DealRoomThumb,
  sparrow: SparrowThumb,
};
