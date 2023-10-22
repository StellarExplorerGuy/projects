import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

interface TabsVerticalProps {
  tabs: { headers: string[]; data: JSX.Element[] }
}

export default function TabsVertical({ tabs }: TabsVerticalProps) {
  return (
    <Tabs aria-label="tabs" orientation="vertical" size="md">
      <TabList sx={{ width: 270, minWidth: 270 }}>
        {tabs.headers.map((header) => (
          <Tab variant="plain" color="primary" key={header}>
            {header}
          </Tab>
        ))}
      </TabList>
      {tabs.data.map((item, index) => (
        <TabPanel key={index} sx={{ p: 0 }} value={index}>
          {item}
        </TabPanel>
      ))}
    </Tabs>
  )
}
