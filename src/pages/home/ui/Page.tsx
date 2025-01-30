import { Logo } from '@shared/ui';

export function Page() {
  return (
    <>
      <header className="flex h-[110px] w-full items-center justify-center lg:h-[150px]">
        <Logo />
      </header>
      <main>
        <h1 className="sr-only">Meta Planet</h1>
      </main>
    </>
  );
}
