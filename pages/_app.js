import { useEffect } from 'react';
import '../styles/global.css';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs'


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
    }]
});


datadogLogs.init({
  clientToken: 'pub4938bf907e0c4d25d15fc6457024b290',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  proxy: "/api/proxy/ddProxy"
})


export default function App({ Component, pageProps }) {
  // this function is to handle client-side actions
  useEffect(() => {
    if(window){
      // single page navigation -- on the client-side
      window.navigation.addEventListener("navigate", (event) => {
        const urlParsed = new URL(event.destination.url)
        datadogRum.startView(urlParsed.pathname);
      })
      // loading navigation -- SSR page
      datadogRum.startView(window.location.pathname)
    }
  },[])
  
  return <Component {...pageProps} />;
}