import { Meta, Title } from '@solidjs/meta';
import PostList from '~/components/PostList';
import { listPage } from '~/lib/posts';

export default function Blog() {
  return (
    <>
      <Title>{"Farm notes | Bramblecut Farm"}</Title>
      <Meta name="description" content={"The Wednesday note from Bramblecut Farm: what went into the ground, what came out of it, what to cook with this week's crate, and what the weather did to the peppers."} />
      <PostList {...listPage(1)} />
    </>
  );
}
