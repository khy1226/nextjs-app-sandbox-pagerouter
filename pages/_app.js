import { useEffect } from 'react';
import '../styles/global.css';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '4d00eb47-81ba-402b-aca2-58410711b526',
    clientToken: 'pub04f54acc2101227f0df67a8e3bd2fe8d',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'next.js-sample-application',
    env: 'hey-corn',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    trackViewsManually: true
});

export default function App({ Component, pageProps }) {
  // this function is to handle client-side actions
  useEffect(() => {
    if(window){
      // single page navigation -- on the client-side
      window.navigation.addEventListener("navigate", (event) => {
        // console.log(event.destination.url.replace(window.location.origin, ""));
        datadogRum.startView(event.destination.url.replace(window.location.origin, ""));
      })
      // loading navigation -- SSR page
      datadogRum.startView(window.location.pathname)
    }
  },[])
  
  return <Component {...pageProps} />;
}