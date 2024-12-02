import { useState } from "react";
import { ActionIcon, Button, BoxProps, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useInput } from "@/hooks";
import { KeywordOption } from "@/types";
import { useIsMobile } from "@/contexts/isMobile";
import FilteringWorkbook from "./FilteringWorkbook";
import FilteringQuizNumber from "./FilteringQuizNumber";
import FilteringWord from "./FilteringWord";

interface FilteringModalProps extends BoxProps {
  apply: (
    workbooks?: string[],
    keyword?: string,
    keywordOption?: KeywordOption,
    perPage?: number, 
  ) => void,
  initalState?: boolean,
  opened?: boolean,
  onOpen?: () => void,
  onClose?: () => void,
};

export default function FilteringModal({
  apply,
  opened: outerOpened,
  onOpen,
  onClose,
  ...others
}: FilteringModalProps) {
  const [ workbooks, setWorkbooks ] = useState<string[]>([]);
  const [ keywordProps ] = useInput('');
  const [ keywordOption, setkeywordOption ] = useState<KeywordOption>('1')
  const [ perPage, setPerPage ] = useState(100);
  const [ opened, { open, close } ] = useDisclosure();
  const isMobile = useIsMobile();

  const innerOpened = outerOpened || opened;
  const innerOnOpen = onOpen || open;
  const innerOnClose = onClose || close;

  const defaultButton = (
    <Button 
      onClick={innerOnOpen}
      leftSection={<IconFilter/>}
      variant="outline"
      color="orange"
      { ...others }
    >絞り込み</Button>
  );

  const mobileButton = (
    <ActionIcon 
      onClick={innerOnOpen}
      color="orange" 
      size="lg" 
      radius="xl" 
      variant="outline"
    >
      <IconFilter/>
    </ActionIcon>
  )

  return (
    <>
      <Modal 
        opened={innerOpened} 
        onClose={() => innerOnClose()}
        title="絞り込み"
        size="lg"
        fullScreen={isMobile}
        pos="absolute"
      >
        <FilteringWorkbook
          values={workbooks} 
          onChange={setWorkbooks}
        />
        <FilteringWord 
          wordInputProps={keywordProps} 
          wordSearchOption={{ 
            value: keywordOption, 
            onChange: setkeywordOption
          }}
          mt="lg"
        />
        <FilteringQuizNumber
          value={perPage}
          onChange={setPerPage}
          mt="lg"
        />
        <Group mt="xl" justify="right">
          <Button 
            leftSection={<IconSearch/>}
            onClick={() => { 
              apply(workbooks, keywordProps.value, keywordOption, perPage);
              close();
            }}
          >検索</Button>
        </Group>
      </Modal>
      { isMobile ? mobileButton : defaultButton }
    </>
  );
}