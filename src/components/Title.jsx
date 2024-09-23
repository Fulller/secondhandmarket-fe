import { Helmet } from "react-helmet";

function Title({ children = "Chợ cũ" }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{children}</title>
      <meta name="description" content="Default description for the page." />
    </Helmet>
  );
}

export default Title;
