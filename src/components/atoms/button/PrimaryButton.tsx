import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export const PrimaryButton: FC<Props> = (props) => {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <>
      <Button
        bg="blue.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        onClick={onClick}
        isLoading={loading}
        disabled={disabled || loading}
      >{children}</Button>
    </>
  );
};
