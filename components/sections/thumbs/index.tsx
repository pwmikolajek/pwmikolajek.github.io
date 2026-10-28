import * as React from "react";
import { BrandGuidelinesThumb } from "./BrandGuidelinesThumb";
import { LetterClashThumb } from "./LetterClashThumb";
import { DealRoomThumb } from "./DealRoomThumb";
import { SparrowThumb } from "./SparrowThumb";
import { WorkbenchThumb } from "./WorkbenchThumb";

export type ThumbProps = { hovered: boolean };
export type ThumbComponent = React.ComponentType<ThumbProps>;

export const projectThumbs: Record<string, ThumbComponent | undefined> = {
  workbench: WorkbenchThumb,
  "hm-brand-guidelines": BrandGuidelinesThumb,
  "letter-clash": LetterClashThumb,
  "deal-room": DealRoomThumb,
  sparrow: SparrowThumb,
};
