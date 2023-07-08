import { Button, Group, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import FilteringWorkbook from "./FilteringWorkbook"
import FilteringLevel from "./FilteringLevel"
import { useInput, useIsMobile } from "../hooks"
import FilteringWord from "./FilteringWord"
import { IconFilter, IconSearch } from "@tabler/icons-react"
import { KeywordOption } from "../types"

interface FilteringModalProps {
  apply: (
    workbooks?: string[],
    levels?: string[],
    keyword?: string,
    keywordOption?: KeywordOption
  ) => void,
}

export default function FilteringModal(
  props: FilteringModalProps
) {
  const [ opened, { open, close } ] = useDisclosure(true)
  const [ workbooks, setWorkbooks ] = useState<string[]>([])
  const [ levels, setLevels ] = useState<string[]>([])
  const [ keywordProps ] = useInput('')
  const [ keywordOption, setkeywordOption ] = useState<KeywordOption>('1')
  const isMobile = useIsMobile()

  const filtering = async () => {
    props.apply(workbooks, levels, keywordProps.value, keywordOption)
    close()
  }

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="Filtering Quiz"
        size="lg"
        fullScreen={isMobile}
      >
        <FilteringWorkbook
          value={workbooks} 
          onChange={setWorkbooks}
        />
        <FilteringLevel 
          value={levels}
          onChange={setLevels}
          mt="lg"
        />
        <FilteringWord 
          wordInputProps={keywordProps} 
          wordSearchOption={{ 
            value: keywordOption, 
            onChange: setkeywordOption 
          }}
          mt="lg"
        />
        <Group mt="xl" position="right">
          <Button 
            leftIcon={<IconSearch/>}
            onClick={filtering}
          >Search</Button>
        </Group>
      </Modal>
      <Button 
        onClick={open}
        leftIcon={<IconFilter/>}
        variant="outline"
        color="orange"
      >Filtering</Button>
    </>
  )
}