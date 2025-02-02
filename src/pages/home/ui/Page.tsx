import { Background } from './Background/Background';
import { Header } from './Header/Header';

export function Page() {
  return (
    <>
      <Background />
      <Header />
      <main>
        <h1 className="sr-only">Meta Planet</h1>
      </main>
    </>
  );
}
