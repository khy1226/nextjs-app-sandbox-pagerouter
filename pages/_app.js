import { useEffect } from 'react';
import '../styles/global.css';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import router from "next/router";
import CookieConsent from "react-cookie-consent";


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


datadogRum.init({
  applicationId: '08fda4c7-4cb4-4623-9b43-064e910f70f5',
  clientToken: 'pubc6967c6721aa8fe22ff695fba1d5486a',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'corn-nextjs-june-take',
    env: 'PRD',
    // Specify a version number to identify the deployed version of your application in Datadog
    version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    trackViewsManually: true,
    proxy: "/api/proxy/ddProxy",
    trackingConsent: "not-granted",
    allowedTracingUrls: [() => {
      return true
    }],
    beforeSend: (event, context) => {
      // collect a RUM resource's response headers
      if (event.type === 'resource' && event.resource.type === 'fetch' && context?.response?.headers) {
          event.context.responseHeaders = Object.fromEntries(context.response.headers)
      }
      return true
    }
});


datadogLogs.init({
  clientToken: 'pubc6967c6721aa8fe22ff695fba1d5486a',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  sessionSampleRate: 100,
  proxy: "/api/proxy/ddProxy"
})
datadogLogs.logger.setLevel("info")


export default function App({ Component, pageProps }) {
  function getGrantCookie() {
    // grant-cookie
    return window.document.cookie.includes("grant-cookie=true")
  }
  
  // this function is to handle client-side actions
  useEffect(() => {
    if(window){
      // single page navigation -- on the client-side
      /*window.navigation.addEventListener("navigate", (event) => {
        const urlParsed = new URL(event.destination.url)
        datadogRum.startView(urlParsed.pathname);
      })
      // loading navigation -- SSR page
      datadogRum.startView(window.location.pathname)*/
      const userObj = localStorage.getItem("userObj") ?
          JSON.parse(localStorage.getItem("userObj")) :
          {
              id: makeid(10),
              name: makeid(10),
              email: `${makeid(5)}@${makeid(5)}.com`
          }
      datadogRum.setUser(userObj)
      datadogRum.setGlobalContext({
          loadingId: makeid(10),
      });
      localStorage.setItem("userObj", JSON.stringify(userObj));
    }
  },[])

  useEffect(() => {
    // We listen to this event to determine whether to redirect or not
    router.events.on("routeChangeStart", handleRouteChange);
    datadogRum.setTrackingConsent(getGrantCookie() ? "granted" : "not-granted")
    datadogRum.startView(window.location.pathname)
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const handleRouteChange = (url) => {
    console.log("App is changing to: ", url);
    const urlParsed = new URL(`${window.location.origin}${url}`)
    datadogRum.startView(urlParsed.pathname);
  };
  
  return <>
    <CookieConsent
      enableDeclineButton
      location="bottom"
      buttonText="GRANT ME!"
      cookieName="grant-cookie"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
      onDecline={() => {
        datadogRum.setTrackingConsent("not-granted")
      }}
      onAccept={() => {
        datadogRum.setTrackingConsent("granted")
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
    <Component {...pageProps} />
  </>;
}