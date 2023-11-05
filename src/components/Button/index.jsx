import './style.css'

export const Button = ({onClick, text, disabled}) => {
  return (
    <div className='container-button'>
      <button
        onClick={onClick}
        disabled={disabled}
      >
       {text}
      </button>
    </div>
  )
}
