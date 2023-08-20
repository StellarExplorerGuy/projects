import FormLabel from '@mui/joy/FormLabel'

interface FormItemProps {
  text: string
}
function FormItem({ text }: FormItemProps) {
  return (
    <FormLabel
      sx={(theme) => ({
        '--FormLabel-color': theme.vars.palette.primary.plainColor,
      })}
    >
      {text}
    </FormLabel>
  )
}

export default FormItem
