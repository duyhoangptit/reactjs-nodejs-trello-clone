import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'
// toastify
import { ToastContainer } from 'react-toastify'
// important import css
import 'react-toastify/dist/ReactToastify.css'

const inputGlobalStyles =  <GlobalStyles styles={{}}/>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      {/*support chay cho nhieu loai trinh duyet khac nhau*/}
      <CssBaseline/>
      {/*add style, custom style global*/}
      {inputGlobalStyles}
      <App />
      {/*toastify*/}
      <ToastContainer position={'bottom-left'} theme={'colored'}/>
    </CssVarsProvider>
  </React.StrictMode>
)
