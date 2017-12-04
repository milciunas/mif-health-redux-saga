import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron
  .configure()
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(sagaPlugin())
  .use(reactotronRedux())
  .connect();

const hijackConsole = (browserConsole) => {
  console.log = (...args) => {
    Reactotron.display({
      name: 'CONSOLE.LOG',
      value: args,
      preview: args.length > 1 ? JSON.stringify(args) : args[0]
    });
  };
};

hijackConsole(console.log);
