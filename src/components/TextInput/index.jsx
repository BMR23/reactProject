import './style.css'

export const TextInput = ({onChange, value, type}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type={type} 
      placeholder='Type your search'
    />
  )
}