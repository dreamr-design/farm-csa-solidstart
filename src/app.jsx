import { MetaProvider } from '@solidjs/meta';
import { Router, useLocation } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import site from '~/site.config';

const year = new Date().getFullYear();

const trim = (path) => path.replace(/\/+$/, '') || '/';

/**
 * The shared shell around every page: the header, the page, the footer
 * @param {object} props - The page as children
 */
function Layout(props) {
  const location = useLocation();
  const current = (path) => (trim(path) === trim(location.pathname) ? { 'aria-current': 'page' } : {});
  return (
<>
<a class="skip" href="#main">Skip to content</a>
  <p class="topbar">Farm stand open <strong>Fri to Sun, 9 to 6</strong> on County Road B. The honor box never closes.</p>
  <header class="site-header">
    <div class="wrap">
      <a class="logo" href="/" aria-label="Bramblecut Farm, home">
        <img src="/assets/img/mark.svg" alt="" width="46" height="46" />{' '}
        <span>Bramblecut<small>Farm · Est. 2011</small></span>
      </a>{' '}
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span aria-hidden="true"></span>Menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        <ul>
          <li><a href="/" {...current("/")}>Home</a></li>
          <li><a href="/pricing/" {...current("/pricing/")}>Shares &amp; pricing</a></li>
          <li><a href="/about/" {...current("/about/")}>About the farm</a></li>
          <li><a href="/blog/" {...current("/blog/")}>Farm notes</a></li>
          <li><a href="/contact/" {...current("/contact/")}>Contact</a></li>
        </ul>
        <a class="btn btn--sm" href="/pricing/">Join the CSA</a>
      </nav>
    </div>
  </header>
{props.children}
<footer class="site-footer">
    <div class="wrap">
      <div>
        <a class="logo" href="/" aria-label="Bramblecut Farm, home"><img src="/assets/img/mark.svg" alt="" width="46" height="46" /><span>Bramblecut<small>Farm · Est. 2011</small></span></a>
        <p>Certified organic vegetables from 22 acres of Driftless hillside near Viroqua, Wisconsin. Grown by five people, a lot of volunteers, and one very old tractor.</p>
      </div>
      <div>
        <h2>The farm</h2>
        <ul><li><a href="/">Home</a></li><li><a href="/pricing/">Shares &amp; pricing</a></li><li><a href="/about/">About the farm</a></li><li><a href="/about/#visit">Visit the stand</a></li><li><a href="/blog/">Farm notes</a></li><li><a href="/contact/">Contact the farm</a></li></ul>
      </div>
      <div>
        <h2>Farm stand</h2>
        <ul><li>Fri to Sun, 9 am to 6 pm</li><li>E4410 County Road B</li><li>Viroqua, WI 54665</li></ul>
      </div>
      <div>
        <h2>Write to us</h2>
        <ul><li><a href="mailto:hello@bramblecut.farm">hello@bramblecut.farm</a></li><li>(608) 555-0147</li><li>We answer after chores.</li></ul>
      </div>
      <p class="copy"><span>© {year} Bramblecut Farm. Grown in Vernon County, Wisconsin.</span><span>Certified organic since 2014</span></p>
      <p class="theme-credit">Free theme by <a href="https://dreamr-design.github.io/dreamr-web" rel="noopener">Dreamr</a>. Built with <a href="https://chatsy.ai" rel="noopener">Chatsy AI chat</a> and <a href="https://slapform.com" rel="noopener">Slapform forms</a>.</p>
    </div>
  </footer>
{site.chatsy_agent_id && (<>
<script src="https://cdn.jsdelivr.net/npm/chatsy@latest/dist/chatsy.min.js" data-agent-id={site.chatsy_agent_id} data-button-background-color="#862612" data-button-text-color="#FFFFFF"></script>
</>)}{' '}
{site.slapform_form_id && (<>
<script src="https://cdn.jsdelivr.net/npm/slapform@latest/dist/slapform.min.js" defer></script>
</>)}

</>
  );
}

export default function App() {
  return (
    <MetaProvider>
      <Router root={(props) => <Layout><Suspense>{props.children}</Suspense></Layout>}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
