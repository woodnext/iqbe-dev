import { useState } from "react";
import { Card, Center, Divider, Group, Loader, Paper, Text, Title } from "@mantine/core";
import { Period } from "@/plugins/dayjs";
import { useAllUserRanking } from "@/hooks/useUserRanking";
import ActivityRank from "./ActivityRank";
import ActivitySelectRange from "./ActivitySelectRange";

export default function ActivityUserRanking(){
  const [ period, setPeriod ] = useState<Period>('day');
  const { allUserRanking } = useAllUserRanking(period);

  const Item = allUserRanking?.length !== 0 ? 
  allUserRanking?.map((r) => {
    return (
      <ActivityRank
        name={r.name}
        rank={r.rank}
        count={r.count}
        key={r.userId}
      />
    )
  }) 
  :
  <Center><Text>No data</Text></Center>
  
  return (
    <Card>
      <Group justify="space-between">
        <Title size="h2">Ranking</Title>
        <ActivitySelectRange
          period={period}
          onClick={setPeriod}
        />
      </Group>
      <Divider my="sm"/>
      <Paper mih={300}>
      {
        !!allUserRanking ?
          Item
        :
        <Center h={300}>
          <Loader variant="dots"/>
        </Center>
      }
      </Paper>
    </Card>
  )
}