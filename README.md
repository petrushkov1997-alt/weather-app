# Weather App

A React + TypeScript app that looks up current weather for a city via [WeatherAPI](https://www.weatherapi.com/) and remembers recent searches.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API key

The app reads its WeatherAPI key from a `REACT_APP_WEATHER_API_KEY` environment variable. Create a `.env` file at the project root:

```
REACT_APP_WEATHER_API_KEY=your_weatherapi_key_here
```

Get a free key at [weatherapi.com](https://www.weatherapi.com/signup.aspx). The variable is consumed in `src/config/api.ts` and injected into every request by `src/shared/api/weather/apiClient.ts`.

### 3. Run

```bash
npm start          # dev server at http://localhost:3000
npm run build      # production build
npm test           # tests in watch mode
npm run format     # prettier across src
```

## Architecture

The codebase follows a layered structure under `src/`:

- **`features/`** — feature modules. Each module owns its UI, hooks, and types and exposes a single component plus, where relevant, a hook. Features compose other features but never reach into another feature's internals.
- **`shared/`**
  - **`shared/api/`** — data-fetching layer. One folder per resource, each with `apiClient.ts` (HTTP wrapper), `types.ts` (DTOs), and `index.ts` (public functions). All network calls and persistence (e.g. localStorage) live here so features stay decoupled from the data source.
  - **`shared/ui/`** — generic, presentational components (`Autocomplete`, `Icon`, `Input`, `Paper`). No feature knowledge.
  - **`shared/hooks/`** — generic hooks (`useClickOutside`, `useDebouncedCallback`).
- **`config/`** — environment-derived constants (e.g. API key).
- **`errorReporting/`** — single `reportUnknownError` entry point used by the React Query global handlers in `Providers.tsx`. Easy to swap for Sentry/Datadog later.
- **`App/`** — root layout and the `Providers` stack (currently `QueryClientProvider`).

Path aliases are configured via `tsconfig.json`'s `baseUrl: "src"`, so all imports are absolute (`shared/api/weather`, `features/weather`, etc.).

### Feature modules

- **`weather`** — top-level feature container. Composes `cityWeather` and `searchHistory` and wires their interaction (selecting a city in `cityWeather` adds it to `searchHistory`).
- **`cityWeather`** — search-and-display flow for a single city. Owns the search input with autocomplete, debounced city lookup, and the weather card. Uses React Query for data fetching with a 60 s refetch interval to keep the displayed weather fresh.
- **`searchHistory`** — recently searched cities. Exposes a `useSearchHistory` hook backed by React Query, with mutation methods that delegate persistence to `shared/api/searchHistory` (currently localStorage). The `SearchHistory` component renders the list.