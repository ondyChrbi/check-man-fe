import {AppUser} from "../../../../lib/graphql/meQuery";
import React from "react";

interface Props {
    user: AppUser,
    children?: JSX.Element
}

const ChallengeAccessBody = ({user, children = <></>}: Props) => {

    return <tr key={user.id} className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {user.stagId}
        </th>
        <td className="px-6 py-4">
            {user.mail}
        </td>
        <td className="px-6 py-4">
            {user.displayName}
        </td>
        <td className="px-6 py-4">
            {children}
        </td>
    </tr>
}


export default ChallengeAccessBody;