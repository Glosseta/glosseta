import React from 'react';
import { Text, Link, VStack, Heading } from '@chakra-ui/react';
import pastDays from "./past-days";
import { useTranslation } from "next-i18next";

const DailyWord = ({words}:{words:any[]}): JSX.Element => {
    const { t } = useTranslation();

    const indexOfWords = pastDays(new Date()) % words.length;
    return (
        <VStack fontSize={{ base: "lg", md: "xl" }}>
            <Heading as="h1" color="white" textAlign="center">{t("wordOfTheDay")}</Heading>
            <Link color="white" href={`/search/term/${words[indexOfWords]}`}>
                <Text casing="capitalize">{words[indexOfWords]}</Text>
            </Link>
        </VStack>
    )
}

export default DailyWord;