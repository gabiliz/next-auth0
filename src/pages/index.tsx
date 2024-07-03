import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from "next";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) return <div>Hello {user.name} <Link href="/api/auth/logout">Logout</Link></div>;
  return (
    <div className="flex flex-row gap-4">
      index
      <Link href="/api/auth/login">Login</Link>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx.req, ctx.res);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }

  const { accessToken } = await getAccessToken(ctx.req, ctx.res);
  console.log('token de acesso:', accessToken);

  return { props: { foo: 'bar' } };
}