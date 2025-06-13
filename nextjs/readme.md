# Nexjs

**Obs:** Server Components can include Client Components — not the other way around.

## Server Component

### Limitations:
<img src="server-components-limitations.png" width="70%">


## Client Component

### Limitations:
Can not import or define server components into it.  

<img src="server-component-inside-client-component.png" width="70%">

### Calling Server Action from Client Component

<img src="calling-server-action-inside-client-component/bind-action.png" width="70%">
Form will work even if the user isn't running JS in their browser.
<br /><br />

<img src="calling-server-action-inside-client-component/start-transition-hook.png" width="70%">

<br />

## Static vs Dynamic Page

<img src="static-dynamic.png" width="100%">

<br />

<img src="what-makes-a-dynamic-page.png" width="70%">

<br />

**Obs:** Nextjs renders dynamic path with wildcard variable dynamicly by default. Run generateStaticParams to render it staticaly.  
<img src="dynamic-path.png" width="70%">


## Cache control

### Time-Based
<img src="cache-control/time-based.png" width="70%">

### On Demand
<img src="cache-control/on-demand.png" width="70%">

### Disable Caching
<img src="cache-control/disable-caching.png" width="70%">

<br />

<img src="nextjs-control-cache.png" width="70%">


## Nextjs Auth

<img src="nextjs-auth-with-github.png" height="600">


## Nextjs session

<img src="session/server-component.png" height="70%">

<img src="session/client-component.png" height="70%">