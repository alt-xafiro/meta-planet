'use client';

import { Tooltip as ReactTooltip } from 'react-tooltip';

export function Tooltip() {
  return (
    <ReactTooltip
      className="!z-[9000] !max-w-[200px] !rounded-[16px] !bg-space-500 !text-sm !transition-none !duration-0 sm:!text-base"
      anchorSelect=".react-tooltip"
      opacity={1}
      place="bottom-start"
      noArrow
      globalCloseEvents={{
        escape: true,
        scroll: true
      }}
      render={({ content }) => <div>{content}</div>}
    />
  );
}
