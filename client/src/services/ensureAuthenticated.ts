import { GetServerSidePropsContext } from 'next'
import axios from 'axios'

export async function ensureAuthenticated(context: GetServerSidePropsContext) {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/protected`, {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    return {
      props: {},
    }
  } catch {
    try {
      const { session } = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {
          withCredentials: true,
          headers: {
            Cookie: context.req.headers.cookie,
          },
        })
        .then((res) => res.data)
      return {
        props: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        },
      }
    } catch {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  }
}
