import Link from "next/link"

import { HeaderCanvas, HeaderLink, HeaderStack, HeaderTitle } from "./styles"

const HeaderBanner = () => (
  <HeaderCanvas>
    <HeaderTitle>React Meetups</HeaderTitle>
    <HeaderStack>
      <Link href="/" passHref>
        <HeaderLink>All Meetups</HeaderLink>
      </Link>
      <Link href="/add-meetup" passHref>
        <HeaderLink>Add New Meetup</HeaderLink>
      </Link>
    </HeaderStack>
  </HeaderCanvas>
)

export default HeaderBanner
