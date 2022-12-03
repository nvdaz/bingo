import { Metric, onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import ReactGA from 'react-ga';

function sendToAnalytics({ name, id, value }: Metric) {
  ReactGA.event({
    category: 'Web Vitals',
    action: name,
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true,
    transport: 'beacon',
  });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
