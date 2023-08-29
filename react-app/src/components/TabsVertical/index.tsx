import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

interface TabsVerticalProps {
  tabs: { headers: string[]; data: JSX.Element[] }
}

export default function TabsVertical({ tabs }: TabsVerticalProps) {
  return (
    <Tabs aria-label="Vertical tabs" orientation="vertical" >
      <TabList sx={{ width: 270, minWidth: 270 }}>
        {tabs.headers.map((header) => (
          <Tab key={header}>{header}</Tab>
        ))}
      </TabList>
      {tabs.data.map((item, index) => (
        <TabPanel sx={{ p: 0 }} value={index}>
          {item}
        </TabPanel>
      ))}
    </Tabs>
  )
}
