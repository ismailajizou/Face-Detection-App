import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { ColorModeScript, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from "react-router-dom";
import  { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <PersistGate persistor={persistor}>
            <App /> 
          </PersistGate>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
