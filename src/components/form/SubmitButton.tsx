interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({text}: SubmitButtonProps) => {
  return (
    <button
    className="w-full rounded-lg bg-teal-500 py-4 text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl"
    >{text}</button>
  )
}

export default SubmitButton