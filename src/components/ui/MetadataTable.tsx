import React from "react";

interface Props {
    title: string
    data: Array<Array<string>>
}

const MetadataTable = ({title, data}: Props) => {
    return <div className="relative overflow-x-auto rounded-2xl">
        <div className="text-xs h-10 uppercase bg-teal-700 w-full text-white text-center flex flex-col justify-center items-center align-middle">
            <div className="w-full">{title}</div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
            <tbody>
            {data.map((row, index) => {
                const backgroundColor = (index % 2) ? "bg-teal-100" : "bg-gray-100"
                return <tr className={backgroundColor}>
                    {row.map(column =>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {column}
                        </th>
                    )}
                </tr>
            })}
            </tbody>
        </table>
    </div>

}

export default MetadataTable