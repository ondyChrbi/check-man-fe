
interface Props {
    color?: string

    fontColor?: string

    title?: string
}

const CourseIconChip = ({ color = "bg-white", fontColor = "text-black", title = "" }: Props) => {
    return <div className={`flex flex-col rounded-full font-bold absolute right-0 p-1.5 ${color} ${fontColor}`}>
        {title}
    </div>
}

export default CourseIconChip