import Navbar from "@/components/navbar/navbar";
import store from "@/store/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </Provider>
    </SessionProvider>
  );
}
