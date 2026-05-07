import { Providers } from './Providers';
import { Weather } from '../features/weather';

import './styles.css';

export const App = () => (
  <Providers>
    <div className="App">
      <Weather />
    </div>
  </Providers>
);
