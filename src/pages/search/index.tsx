import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FallBack from "../../components/loading/fallback";

const SearchRedirect = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  });

  return <FallBack />;
};

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default SearchRedirect;
