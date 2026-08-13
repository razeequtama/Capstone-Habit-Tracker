type HeadingProps = {
    text: string
}

export default function Heading(props: HeadingProps)
{
  return <h1 className="font-bold text-5xl text-amber-50 px-6 py-4">{props.text}</h1>
}