import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

interface CustomTabsProps {
  tabs: { headers: string[]; data: JSX.Element[] }
  orientation?: 'horizontal' | 'vertical'
  tabsListSx?: { width: number; minWidth: number }
  onClick?: (index: number) => void
}

export default function CustomTabs({
  tabs,
  orientation = 'vertical',
  tabsListSx = { width: 270, minWidth: 270 },
  onClick = (_: number) => {},
}: CustomTabsProps) {
  return (
    <Tabs aria-label="tabs" orientation={orientation} size="md" onChange={(_, value) => onClick(value as number)}>
      <TabList sx={tabsListSx}>
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
