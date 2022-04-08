import {
  Box,
  chakra,
  Center,
  Heading,
  Text,
  Stack,
  Flex,
  Input,
  Select,
  Textarea,
  Button,
  Container,
  FormLabel,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";

import { FieldValues, useForm } from "react-hook-form";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useState } from "react";

import PageLayout from "../components/layout/page";

const RequestTerm = (): JSX.Element => {

  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const _onSubmit = (values: FieldValues) => {

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
                <form onSubmit={handleSubmit<FieldValues>(_onSubmit)}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="start">
                    <FormControl isInvalid={errors.term}>
                      <FormLabel
                        color="#FFFDFD"
                        htmlFor="term"
                        data-testid="term-label"
                      >
                        {t("termLabel")}
                      </FormLabel>
                      <Input
                        id="term"
                        data-testid="term-input"
                        border="1px solid #000000"
                        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                        backgroundColor="#FFFDFD"
                        borderRadius="3px"
                        height="37px"
                        width={{ base: "300px", md: "526px", lg: "600px" }}
                        marginTop={{ base: 1 }}
                        marginBottom={{ base: 8, md: 6, lg: 4 }}
                        {...register("term", {
                          required: "This field is required",
                          minLength: { value: 2, message: "Minimum length should be 2" }
                        })}
                      />
                      <FormErrorMessage>
                        {errors.term && errors.term.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormLabel
                      marginTop="1"
                      color="#FFFDFD"
                      htmlFor="category"
                      data-testid="category-label">
                      {t("termCategoryLabel")}
                    </FormLabel>

                    <Select
                      name="category"
                      data-testid="term-category-select"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                      id="category"
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

                    <FormControl isInvalid={errors.reason}>
                      <FormLabel
                        style={{ color: "#FFFDFD" }}
                        htmlFor="reason"
                        data-testid="reason-label">
                        {t("termAdditionReasonLabel")}
                      </FormLabel>
                      <Textarea
                        data-testid="term-reason"
                        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                        id="reason"
                        backgroundColor="#FFFDFD"
                        borderRadius="3px"
                        width={{ base: "300px", md: "526px", lg: "600px" }}
                        height="164px"
                        marginTop="1"
                        marginBottom={{ base: 8, md: 6, lg: 4 }}
                        {...register("reason", {
                          required: "This field is required",
                          minLength: { value: 10, message: "Minimum length should be 10" }
                        })}
                      />
                      <FormErrorMessage>
                        {errors.reason && errors.reason.message}
                      </FormErrorMessage>
                    </FormControl>

                    <Container centerContent marginTop="3">
                      <Button
                        isLoading={isSubmitting}
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
