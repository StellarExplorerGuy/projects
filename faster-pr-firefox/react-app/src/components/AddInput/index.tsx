import FormItem from '../FormItem'
import * as React from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'

type AddInputProps = {
  items: UniqueIdentifier[]
  setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
    }>
  >
}

function AddInput({ items, setItems, setAlertInfo }: AddInputProps) {
  const [data, setData] = React.useState<{
    input: string
  }>({
    input: '',
  })

  const handleSubmit = () => {
    if (!data.input.trim().length) return

    // Check if the input value already exists in the items array
    const isDuplicate = items.some((item) => item === data.input)
    if (!isDuplicate) {
      setItems([data.input, ...items])
    } else {
      setAlertInfo({
        visible: true,
        msg: `Item is already added [${data.input}]`,
        type: 'warning',
      })
      setTimeout(() => {
        setAlertInfo({
          visible: false,
          msg: '',
          type: 'warning',
        })
      }, 5000)
    }

    setData({ input: '' })
  }

  return (
    <FormControl>
      <FormItem text="Branch prefix" />
      <Input
        sx={{ '--Input-decoratorChildHeight': '45px' }}
        placeholder="feat/"
        type="text"
        variant="outlined"
        size="sm"
        color="primary"
        required
        value={data.input}
        onChange={(event) => setData({ input: event.target.value })}
        endDecorator={
          <>
            <IconButton onClick={() => setData({ input: '' })}>
              <ClearOutlinedIcon color="info" sx={{ fontSize: 'var(--joy-fontSize-md)' }} />
            </IconButton>
            <Button
              sx={{ ml: 1.5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              variant="solid"
              color="primary"
              size="sm"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </>
        }
      />
    </FormControl>
  )
}

export default AddInput
