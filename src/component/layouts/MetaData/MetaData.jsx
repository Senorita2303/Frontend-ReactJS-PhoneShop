/* eslint-disable react/prop-types */

import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaData({ title }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
}