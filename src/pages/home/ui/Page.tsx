import { Background } from './Background/Background';
import { Header } from './Header/Header';
import { Planets } from './Planets/Planets';

export function Page() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Meta Planet</h1>
        <Planets />
      </main>

      <Background />
    </>
  );
}
