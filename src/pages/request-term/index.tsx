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
  Button,
  Container,
  FormLabel
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useState } from "react";

const RequestTerm = (): JSX.Element => {

  const { t } = useTranslation()
  type FormEntries = {
    term: string,
    category: string,
    reason: string
  }
  const [formEntries, setFormEntries] = useState<FormEntries>({ term: '', category: '', reason: '' })
  type Event = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

  const handlechange = (event: Event) => {
    setFormEntries({
      ...formEntries,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(formEntries)
  }

  return (
    <>
      <PageLayout>
        <chakra.main>
          <Container centerContent>
            <Box
              as="div"
              marginBottom="16">
              <Heading
                as="h1"
                textAlign="center"
                fontSize="48px"
                lineHeight="58px"
                color="#FEF9F9"
                fontStyle="normal"
                fontWeight="400"
                title="request-a-term">
                {t("requestATermTitle")}
              </Heading>
              <Text
                title="request-a-term-description"
                paddingTop="2"
                width="332px"
                height="25px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                fontSize="14px"
                lineHeight="17px"
                color="#FEF9F9"
              >
                {t("requestATermText")}
              </Text>
            </Box>

            <Stack spacing={1}
              paddingLeft={{ base: 10 }}
              paddingRight={{ base: 10 }}>
              <Center>
                <form onSubmit={handleSubmit}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="start">
                    <FormLabel
                      color="#FFFDFD"
                      htmlFor="Term"
                      data-testid="term-label"
                    >
                      {t("termLabel")}
                    </FormLabel>
                    <Input
                      errorBorderColor="red.300"
                      value={formEntries.term}
                      onChange={handlechange}
                      name="term"
                      data-testid="term-input"
                      border="1px solid #000000"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                      id="Term"
                      backgroundColor="#FFFDFD"
                      borderRadius="3px"
                      height="37px"
                      width={{ base: "300px", md: "526px", lg: "600px" }}
                      marginTop={{ base: 1 }}
                      marginBottom={{ base: 8, md: 6, lg: 4 }} />
                    <FormLabel
                      color="#FFFDFD"
                      htmlFor="Category"
                      data-testid="category-label">
                      {t("termCategoryLabel")}
                    </FormLabel>
                    <Select
                      value={formEntries.category}
                      onChange={handlechange}
                      name="category"
                      data-testid="term-category-select"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                      id="Category"
                      placeholder="Select a Category"
                      backgroundColor="#FFFDFD"
                      borderRadius="3px"
                      height="37px"
                      width={{ base: "300px", md: "526px", lg: "600px" }}
                      marginTop="1"
                      marginBottom={{ base: 8, md: 6, lg: 4 }}>
                      <option value="general">{t("generalOption")}</option>
                      <option value="protocol">{t("protocolOption")}</option>
                      <option value="dao">{t("DAOoption")}</option>
                      <option value="Token">{t("tokenOption")}</option>
                      <option value="application">{t("applicationOption")}</option>
                      <option value="finance">{t("financeOption")}</option>
                    </Select>
                    <FormLabel
                      style={{ color: "#FFFDFD" }}
                      htmlFor="Reason"
                      data-testid="reason-label">
                      {t("termAdditionReasonLabel")}
                    </FormLabel>
                    <Textarea
                      value={formEntries.reason}
                      onChange={handlechange}
                      name="reason"
                      data-testid="term-reason"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                      id="Reason"
                      backgroundColor="#FFFDFD"
                      borderRadius="3px"
                      width={{ base: "300px", md: "526px", lg: "600px" }}
                      height="164px"
                      marginTop="1"
                      marginBottom={{ base: 8, md: 6, lg: 4 }}
                    />
                    <Container centerContent marginTop="3">
                      <Button
                        type="submit"
                        data-testid="submit-button"
                        background="#373636"
                        color="#FFFEFE"
                        fontSize="16px"
                        fontWeight="100px"
                        fontStyle="normal"
                        lineHeight="29px">
                        {t("submitBtnText")}
                      </Button>
                    </Container>
                  </Flex>
                </form>
              </Center>
            </Stack>
          </Container>
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
