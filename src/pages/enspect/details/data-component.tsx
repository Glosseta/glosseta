import { Text, Stat, StatLabel } from "@chakra-ui/react";
const NOT_SET = "NOT_SET";

const DataComponent = ({
  label,
  data,
}: {
  label: string;
  data: string;
}): JSX.Element => {
  return (
    <>
      {data && data != NOT_SET && (
        <Stat title={label}>
          <StatLabel fontSize={{ base: "md", sm: "xl" }} fontWeight={"bold"}>
            {label}
          </StatLabel>
          <Text fontSize={{ base: "xs", sm: "md" }}>{data}</Text>
        </Stat>
      )}
    </>
  );
};

export default DataComponent;
