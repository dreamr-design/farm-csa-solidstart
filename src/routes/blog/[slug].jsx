import { Meta, Title } from '@solidjs/meta';
import { useParams } from '@solidjs/router';
import { getPost } from '~/lib/posts';

export default function Post() {
  const params = useParams();
  const post = getPost(params.slug);
  return (
    <>
      <Title>{post.title}</Title>
      <Meta name="description" content={post.description} />
<main id="main">
    <article class="post" aria-labelledby="page-title">
      <div class="page-hero">
        <div class="wrap">
          <div>
            <p class="kicker">Farm notes · From the rows at Bramblecut</p>
            <h1 id="page-title">{post.title}</h1>
            <p class="lede">{post.description}</p>
            <p class="post-meta"><span>Written after chores</span><span class="post-date">{post.date}</span></p>
          </div>
          <p class="stamp stamp--round">Written<strong>Wed.</strong>packed Thurs.</p>
        </div>
      </div>

      <div class="wrap post-wrap">
        <figure class="post-lead">
          <img src="/assets/img/hills.svg" alt="Screenprint of the Bramblecut hollow at sunrise: the red barn, a silo, and the striped rows of the south slope" width="1440" height="320" />
        </figure>

        <div class="post-body" innerHTML={post.content} />

        <p class="post-back"><a href="/blog/">&larr; All farm notes</a></p>
      </div>
    </article>
  </main>
    </>
  );
}
