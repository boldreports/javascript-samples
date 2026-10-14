export class Header {
    constructor(element) {
        this.element = element;
    }

    async init() {
        this.element.innerHTML = await this.fetchFile('src/common/header/header.html');
        this.applyFrameworkPillLinks();
        this.appendLeadParamsToTryItFree();
        this.element.getElementsByClassName('ej-sb-hamburger-icon')[0].addEventListener('click', this.onHamBurgerClick.bind(this));
    }
    async fetchFile(path) {
        let response = await fetch(path);
        let data = await response.text();
        return data;
    }

    applyFrameworkPillLinks() {
        const isLocal = !window.location.hostname.toLowerCase().includes('boldreports.com');
        const pills = this.element.querySelectorAll('a.ej-fw-pill[data-fw-slug]');
        pills.forEach((pill) => {
            const slug = pill.getAttribute('data-fw-slug') || '';
            pill.setAttribute(
                'href',
                isLocal
                    ? (slug === '' ? '/' : '/' + slug + '.html')
                    : (slug === '' ? '/home/' : '/home/' + slug + '.html')
            );
        });
    }

    appendLeadParamsToTryItFree() {
        const link = this.element.querySelector('a.try-it-free');
        if (!link || !link.href.includes('evaluation=v2')) {
            return;
        }

        const getQueryParameter = (name) => {
            const params = window.location.search.substring(1).split('&');
            for (const param of params) {
                const [key, value = ''] = param.split('=');
                if (key === name) {
                    return decodeURIComponent(value).trim();
                }
            }
            return null;
        };

        const getCookie = (name) => {
            const prefix = name + '=';
            const cookies = document.cookie.split(';');
            for (const raw of cookies) {
                const cookie = raw.trim();
                if (cookie.indexOf(prefix) === 0) {
                    return decodeURIComponent(cookie.substring(prefix.length));
                }
            }
            return null;
        };

        const referrer = getCookie('referral_url') || document.referrer || window.location.href;
        const cleanUrl = (url) => {
            if (!url) { return ''; }
            try {
                const parsed = new URL(url);
                return parsed.origin + parsed.pathname;
            } catch {
                return url.split(/[?#]/)[0];
            }
        };
        const landingPageUrl = cleanUrl(window.location.href);
        const referrerOriginUrl = cleanUrl(referrer);

        const gclid = getQueryParameter('gclid') || getCookie('gclid') || '';
        const uuid = getCookie('_uid') || '';

        const leadSource = getQueryParameter('utm_campaign')
            || (getQueryParameter('gclid') ? getQueryParameter('gclid') : null)
            || (getCookie('lead_source') && getCookie('lead_source') !== 'www.google.com' ? getCookie('lead_source') : null)
            || (referrer ? referrer.split('/')[2] : location.hostname);
        const leadCategory = (() => {
            const utmSource = getQueryParameter('utm_source');
            if (utmSource) { return utmSource; }
            if (getQueryParameter('gclid')) { return 'Google_Ads'; }
            const stored = getCookie('lead_category');
            if (stored) { return stored; }
            const referrerDomain = referrer ? referrer.split('/')[2] : '';
            const mappings = {
                'medium.com': 'medium',
                'nuget.org': 'nuget',
                'npmjs.com': 'npm',
                'github.com': 'github',
                'facebook.com': 'facebook',
                'linkedin.com': 'linkedin',
                'twitter.com': 'twitter',
                'x.com': 'twitter'
            };
            for (const key in mappings) {
                if (referrerDomain.indexOf(key) !== -1) {
                    return mappings[key];
                }
            }
            return 'Site_Visitors';
        })();

        const appendQueryParam =
            '&leadsource=' + encodeURIComponent(leadSource || '') +
            '&leadcategory=' + encodeURIComponent(leadCategory || '') +
            '&opportunitysource=' + encodeURIComponent(leadSource || '') +
            '&opportunitycategory=' + encodeURIComponent(leadCategory || '') +
            '&uuid=' + encodeURIComponent(uuid) +
            '&gclid=' + encodeURIComponent(gclid) +
            '&referrerroriginurl=' + encodeURIComponent(referrerOriginUrl) +
            '&secondaryreferraloriginurl=' + encodeURIComponent(landingPageUrl) +
            '&landingpageurl=' + encodeURIComponent(landingPageUrl) +
            '&secondaryleadsource=Bold_Reports_Trial';

        const baseHref = link.href.split('evaluation=v2')[0] + 'evaluation=v2';
        link.href = baseHref + appendQueryParam;
    }

    onHamBurgerClick() {
        if (window.matchMedia('(max-width:550px)').matches) {
            let mobileOverlay = document.querySelector('.mobile-overlay');
            let mobileSideBar = document.querySelector('ej-sidebar');
            if (mobileSideBar.classList.contains('ej-toc-mobile-slide-left')) {
                mobileSideBar.classList.remove('ej-toc-mobile-slide-left');
                mobileOverlay.classList.add('e-hidden');
            } else {
                mobileSideBar.classList.add('ej-toc-mobile-slide-left');
                mobileOverlay.classList.remove('e-hidden');
            }
        } else {
            let desktopSidebar = document.querySelector('.ej-main-parent-content');
            let classFn = desktopSidebar.classList.contains('ej-toc-slide-left') ? 'remove' : 'add';
            desktopSidebar.classList[classFn]('ej-toc-slide-left');
        }
    }
}