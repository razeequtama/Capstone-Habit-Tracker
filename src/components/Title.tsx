type TitleProps = {
    text: string
}

export default function Title(props: TitleProps){
    return <h1 className="font-bold text-5xl text-amber-50 mx-6 my-6">{props.text}</h1>
}