import "../styles/globals.css";
import NavBar from '../Components/NavBar.jsx';
import Footer from '../Components/Footer.jsx';

import {CrowdFundingProvider} from '../Context/CroudFunding.js';


export default function App({ Component, pageProps }) {
  return (
    <CrowdFundingProvider>
      <NavBar/>
      <Component {...pageProps} />
      <Footer />
    </CrowdFundingProvider>
  );
}
