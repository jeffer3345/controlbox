import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { SearchProvider } from "../shared";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </SessionProvider>
  );
};

export default App;
