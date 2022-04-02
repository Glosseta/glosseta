import PageLayout from "../components/layout/page";
import {
  Box,
  chakra,
  Center,
  Heading,
  Text,
  Stack,
  VStack,
  Flex,
  Input,
  Select,
  Textarea,
  Button
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type PageStyles = {
  h1: React.CSSProperties,
  p: React.CSSProperties,
  label: React.CSSProperties,
}

const styles: PageStyles = {

  h1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "48px",
    lineHeight: "58px",
    textAlign: "center",
    color: "#FEF9F9",
  },
  p: {
    width: "332px",
    height: "25px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#FEF9F9"
  },

  label: {
    position: "absolute",
    width: "120px",
    height: "32px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "29px",
    textAlign: "center",
    color: "#FFFCFC"
  }

}
const RequestTerm = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
      <PageLayout>
        <chakra.main>
          <Box
            as="div"
          >
            <Center>
              <Stack>
                <Heading
                  style={styles.h1}
                  as="h1"
                  title="request-a-term"
                >
                  {t("requestATermTitle")}
                </Heading>
                <Text style={styles.p}>
                  {t("requestATermText")}
                </Text>
              </Stack>
            </Center>
          </Box>

          <Stack spacing={4}>
            <Center>
              <VStack spacing={3}>
                <form>
                  <Flex
                    direction="column"
                  >
                    <label htmlFor="Term">{t("termLabel")}</label>
                    <Input />
                    <label htmlFor="Category">{t("termCategoryLabel")}</label>
                    <Select placeholder='Select option'>
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
                    </Select>
                    <label htmlFor="Why should this term be added?">{t("termAdditionReasonLabel")}</label>
                    <Textarea />
                    <Button>{t("submitBtnText")}</Button>
                  </Flex>
                </form>
              </VStack>
            </Center>
          </Stack>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default RequestTerm;
