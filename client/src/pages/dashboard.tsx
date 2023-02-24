import { GetServerSidePropsContext } from 'next'
import { Dashboard } from '@/screens/Dashboard'
import { setCookie } from 'cookies-next'
import { ensureAuthenticated } from '@/services/ensureAuthenticated'

export default function DashboardPage({
  access_token,
  refresh_token,
}: {
  access_token: string
  refresh_token: string
}) {
  if (access_token) {
    setCookie('access_token', access_token)
  }
  if (refresh_token) {
    setCookie('refresh_token', refresh_token)
  }

  return <Dashboard />
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // return ensureAuthenticated(context)
// }
