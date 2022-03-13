import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  Text,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import { FC } from "react";

export const RegisterUser: FC = () => {
  const onChanegeLastName = (): void => {
    alert("チェンジ");
  };
  return (
    <>
      <Wrap justify="center" mt={10}>
        <Box
          w="300px"
          h="auto"
          bg="white"
          borderRadius="10px"
          shadow="md"
          p={4}
        >
          <Stack textAlign="center" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              ユーザー登録
            </Text>
            <FormControl>
              <InputGroup justifyContent="center">
                <Input
                  width="auto"
                  onChange={onChanegeLastName}
                  placeholder="姓"
                  mx={3}
                />
                <Input
                  width="auto"
                  onChange={onChanegeLastName}
                  placeholder="名"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
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
                  placeholder="郵便番号"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  onChange={onChanegeLastName}
                  placeholder="住所"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  onChange={onChanegeLastName}
                  placeholder="電話番号"
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
            <FormControl>
              <InputGroup>
                <Input
                  onChange={onChanegeLastName}
                  placeholder="確認用パスワード"
                  mx={3}
                />
              </InputGroup>
            </FormControl>

          </Stack>
        </Box>
      </Wrap>
    </>
  );
};
