import {
  Box,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { FC } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: FC = () => {
  const onChanegeLastName = (): void => {
    alert("チェンジ");
  };
  const registerUser = () => {
    alert("ボタン");
  };
  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box
          w="300px"
          h="auto"
          bg="white"
          borderRadius="10px"
          shadow="md"
          p={4}
        >
          <Stack textAlign="center" spacing={4}>
            <FormControl>
              <InputGroup>
                <Input
                  onChange={onChanegeLastName}
                  placeholder="メールアドレス"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  onChange={onChanegeLastName}
                  placeholder="パスワード"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <PrimaryButton onClick={registerUser}>ログイン</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
