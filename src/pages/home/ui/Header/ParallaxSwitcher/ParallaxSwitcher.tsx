import clsx from 'clsx';

import { useEffect, useState } from 'react';

import { useUserSettingsStore } from '@pages/home/model/store/user-settings-store';

import { CustomComponentProps } from '@shared/lib';

type ParallaxSwitcherProps = CustomComponentProps;

const TOOLTIP_TEXT =
  'Parallax background. Experimental feature. Can be glitchy in some browsers.';

export function ParallaxSwitcher({ className }: ParallaxSwitcherProps) {
  const { isParallax, toggleIsParallax } = useUserSettingsStore(
    (state) => state
  );
  const [hasStoreHydrated, setHasStoreHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasStoreHydrated(useUserSettingsStore.persist.hasHydrated());
  }, []);

  const handleChange = () => {
    toggleIsParallax();
  };

  return (
    hasStoreHydrated && (
      <div
        className={clsx(
          className,
          'flex flex-row items-center justify-end gap-2',
          ['text-[14px]', 'lg:text-[16px]', '6xl:text-[20px]']
        )}
      >
        <label
          className={clsx(
            className,
            'label m-0 flex cursor-pointer flex-row items-center gap-2 p-0'
          )}
        >
          <span className="label-text hidden uppercase text-inherit [font-size:_inherit] md:inline">
            Parallax
          </span>
          <input
            type="checkbox"
            className={clsx(
              ['toggle toggle-sm', 'lg:toggle-md', '6xl:toggle-lg'],
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            )}
            checked={isParallax}
            onChange={handleChange}
          />
        </label>
        <span
          className="react-tooltip"
          data-tooltip-content={TOOLTIP_TEXT}
          tabIndex={0}
        >
          <svg className="h-[1.2em] w-[1.2em]" fill="none" viewBox="0 0 24 24">
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M1 12a11 11 0 1 1 22 0 11 11 0 0 1-22 0Zm9-1 1-1h2l1 1v7l-1 1h-2l-1-1v-7Zm4-4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">{TOOLTIP_TEXT}</span>
        </span>
      </div>
    )
  );
}
