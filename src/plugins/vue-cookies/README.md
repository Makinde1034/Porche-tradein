# Cookie Consent Compatibility Mode

> Small brief of the Vue Plugin for Usercentrics Cookie Consent SDK v2 Implementation

In order to follow Porsche Cookie Consent guidelines we need to update DWaaS to the new approach. This involves merging the previously separate privacy banner and the cookie categories into a one consent modal window.

## Usage
Before you can start with the implementation you have to setup a project in the Usercentrics [Admin Interface](https://admin.usercentrics.eu/) and know its Usercentrics `setting-ID`.

### Legacy script (v1)

```html
<script
  src="https://app.usercentrics.eu/latest/main.js"
  id="XXXXXXXXX"
></script>
```

To implement the consent management on your website you only have to integrate this JavaScript tag and add your setting-ID in the id attribute

Second Layer refers to the popin displayed when the "Settings" in clicked from the banner.

### New SDK v2

```html
<script
  src="https://www.porsche.com/redesign-scripts/vendor/udg-uc-sdk.min.js"
  id="XXXXXXXXX"
></script>
```

## TODO

- [x] Basic Plugin Structure
- [x] Check if `window.GlobalConsent` is present from the `cshtml` partials `_UsercentricHeader.cshtml`
- [x] Async load script for sdk depending on the version selected from Sitecore using `window.GlobalConsent.NewModalSDK`
- [x] Test both SDK injection
- [x] Create Privacy Shield Component
- [x] Replace Porsche Live Overlay with Privacy Shield
- [x] Replace Google Maps Overlay with Privacy Shield
- [x] Replace Virtual Shoowrom with Privacy Shield
- [x] Replace Embedded Video with Privacy Shield

- [x] Create different composables for v1 & v2
- [x] allConsentsAccepted is a computed property based on `state.consents` which only should react to Marketing Consents. (Remove analytics)
- [x] Ask if we can keep no-javascript support (legal). If yes, add it to cshtml
```js
<!--Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2NKNJZ" title="Google Tag Manager" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

### v1

- [x] InitEventListeners
- [x] Save local state with consent status `state.consents`
- [x] `acceptAllCookies` function for privacy shield
- [x] Add GTM code again (⚠️ we need to understand WHY the google tag manager [script injected](https://www.googletagmanager.com/gtm.js?id=GTM-PSWBDXV&l=oneGa) contains an initialization to app.usercentrics again )
```js
ucConfig.callbacks = {
  firstLayer: async () => {
    sendSitecoreCookieStatus();

    if (
      window.usercentrics.appLoaded &&
      window.usercentrics.getConsents(serviceIds.analytics).consentStatus &&
      !window.analyticsLoaded
    ) {
      window.analyticsLoaded = true;
      window.oneGa = window.oneGa || [];
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s);
        const dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'oneGa', 'GTM-W2NKNJZ');
    }
  },
  secondLayer: () => {
    const timeout = setTimeout(function () {
      const data = document.querySelectorAll(`[data-expandable="true"]`);
      [...data].forEach((section) => {
        const link = section.querySelectorAll(`[data-readmore="link"]`)[0];
        link.addEventListener('click', function () {
          const readMoreSection = section.querySelectorAll(
            `[data-readmore="text"]`
          )[0];
          readMoreSection.style.display = 'block';
          link.classList.add('hidden');
        });
      });
      clearTimeout(timeout);
    }, 100);
  },
};
```
- [x] Substitute hardcoded event with this  `gtmcode`
- [x] `sendSitecoreCookieStatus` function for Sitecore analytics 
- line 69 getConsents() : On initial page load (when site data is cleared), the uc.getConsents takes too long to return a response before the next functions are called. 
We will need to implement an async await to get the answer before sendSitecoreCookieStatus()

### v2

- [x] InitEventListeners
- [x] Save local state with consent status `state.consents`
- [x] `acceptAllCookies` function for privacy shield
- [x] `sendSitecoreCookieStatus` function for Sitecore analyticis
