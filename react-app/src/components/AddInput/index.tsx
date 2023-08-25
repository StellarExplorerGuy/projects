import FormItem from 'components/FormItem'

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
}

function AddInput({ items, setItems }: AddInputProps) {
  const [data, setData] = React.useState<{
    input: string
    status: 'initial' | 'loading' | 'failure' | 'sent'
  }>({
    input: '',
    status: 'initial',
  })

  const handleSubmit = () => {
    if(!data.input.trim().length) return
    setItems([data.input, ...items])
    setData({ input: '', status: 'initial' })
  }

  return (
    <FormControl>
      <FormItem text="Branch prefix" />
      <Input
        sx={{ '--Input-decoratorChildHeight': '45px' }}
        placeholder="feat/"
        type="text"
        variant="outlined"
        color="primary"
        required
        value={data.input}
        onChange={(event) => setData({ input: event.target.value, status: 'initial' })}
        error={data.status === 'failure'}
        endDecorator={
          <>
            <IconButton onClick={() => setData({ input: '', status: 'initial' })}>
              <ClearOutlinedIcon color="info" fontSize="small" />
            </IconButton>
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              onClick={handleSubmit}
              sx={{ ml: 1.5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
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
