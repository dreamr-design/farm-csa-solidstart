const FILES = import.meta.glob('/posts/*.html', { query: '?raw', import: 'default', eager: true });
const POSTS_PER_PAGE = 6;
const BLOG_URL = '/blog/';

/**
 * Read one post file: its front matter block, then the article body HTML
 * @param {string} file - A /posts/<yyyy-mm-dd>-<slug>.html path
 * @param {string} text - The file's text
 * @returns {object} { slug, title, description, date, published, cover, url, content }
 */
function readPost(file, text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) throw new Error(`${file} has no front matter block`);
  const front = {};
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':');
    if (at < 1) continue;
    const value = line.slice(at + 1).trim();
    front[line.slice(0, at).trim()] = value.startsWith('"') ? JSON.parse(value) : value;
  }
  const slug = file.replace(/^.*\//, '').replace(/\.html$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return {
    slug,
    title: front.title,
    description: front.description || '',
    date: new Date(front.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    published: front.date,
    cover: front.cover ? `/assets/${front.cover}` : '',
    url: `${BLOG_URL}${slug}/`,
    content: text.slice(match[0].length).trim(),
  };
}

// Every post, newest first
const POSTS = Object.entries(FILES).map(([file, text]) => readPost(file, text)).sort((a, b) => b.published.localeCompare(a.published));

/**
 * One post by its slug
 * @param {string} slug - The post's slug
 * @returns {object}
 */
export function getPost(slug) {
  const post = POSTS.find((item) => item.slug === slug);
  if (!post) throw new Error(`No post named ${slug} in posts/`);
  return post;
}

/**
 * The url of one list page
 * @param {number} number - 1 for the first page
 * @returns {string}
 */
const listUrl = (number) => (number === 1 ? BLOG_URL : `${BLOG_URL}page/${number}/`);

/**
 * One list page of 6 posts, with the newer and older page's url
 * @param {number} number - 1 for the first page
 * @returns {{ posts: object[], paginator: { prev: string|null, next: string|null } }}
 */
export function listPage(number) {
  const count = Math.max(1, Math.ceil(POSTS.length / POSTS_PER_PAGE));
  if (!(number >= 1 && number <= count)) throw new Error(`No blog page ${number}`);
  return {
    posts: POSTS.slice((number - 1) * POSTS_PER_PAGE, number * POSTS_PER_PAGE),
    paginator: { prev: number > 1 ? listUrl(number - 1) : null, next: number < count ? listUrl(number + 1) : null },
  };
}
