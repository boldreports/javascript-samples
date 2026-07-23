export function loadTrackingScript() {
    var script = document.createElement('script');
    script.src = 'https://cdn.boldreports.com/website/js/tracking.js?v=' + new Date().getTime();
    script.async = true;
    document.head.appendChild(script);
}

loadTrackingScript();