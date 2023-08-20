import * as React from 'react'

import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import Input from '@mui/joy/Input'
import FormItem from 'components/FormItem'

function AddInput() {
  const [data, setData] = React.useState<{
    email: string
    status: 'initial' | 'loading' | 'failure' | 'sent'
  }>({
    email: '',
    status: 'initial',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setData((current) => ({ ...current, status: 'loading' }))
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' })
      }, 1500)
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormItem text='Branch prefix' />
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="feat/"
          type="text"
          required
          value={data.email}
          onChange={(event) => setData({ email: event.target.value, status: 'initial' })}
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Add
            </Button>
          }
        />
      </FormControl>
    </form>
  )
}

export default AddInput