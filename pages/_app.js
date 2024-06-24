import { useEffect } from 'react';
import '../styles/global.css';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import router from "next/router";


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


datadogRum.init({
    applicationId: '7c95d9bc-fe5c-4371-9621-986c80cf8072',
    clientToken: 'pub4938bf907e0c4d25d15fc6457024b290',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'next.js-sample-application',
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
    allowedTracingUrls: [() => {
      return true
    }],
    beforeSend: (event, context) => {
      // collect a RUM resource's response headers
      if (event.type === 'resource' && event.resource.type === 'fetch') {
          event.context.responseHeaders = Object.fromEntries(context.response.headers)
      }
      return true
    }
});


datadogLogs.init({
  clientToken: 'pub4938bf907e0c4d25d15fc6457024b290',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  sessionSampleRate: 100,
  proxy: "/api/proxy/ddProxy"
})
datadogLogs.logger.setLevel("info")


export default function App({ Component, pageProps }) {
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
  
  return <Component {...pageProps} />;
}