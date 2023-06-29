import { Provider } from "jotai";
import { Controls } from "~/components/Controls";
import { SvgRoot } from "~/components/SvgRoot";

const App = () => (
  <>
    <Provider>
      <SvgRoot />
      <Controls />
    </Provider>
    <Provider>
      <SvgRoot />
      <Controls />
    </Provider>
  </>
);

export default App;
