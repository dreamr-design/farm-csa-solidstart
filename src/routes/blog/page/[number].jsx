import { Meta, Title } from '@solidjs/meta';
import { useParams } from '@solidjs/router';
import PostList from '~/components/PostList';
import { listPage } from '~/lib/posts';

export default function BlogPage() {
  const params = useParams();
  return (
    <>
      <Title>{"Farm notes | Bramblecut Farm"}</Title>
      <Meta name="description" content={"The Wednesday note from Bramblecut Farm: what went into the ground, what came out of it, what to cook with this week's crate, and what the weather did to the peppers."} />
      <PostList {...listPage(Number(params.number))} />
    </>
  );
}
