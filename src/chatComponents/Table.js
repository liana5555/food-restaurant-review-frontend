import React from "react";


export default function Table(props) {



    return (
        <table>
            <tbody>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
                {props.users.map((user) => (
                    <tr key={user.idusers} onClick={() => props.addingMembers(user)} >
                    <td>
                        {user.username}
                    </td>
                    <td>
                        {user.first_name}
                    </td>
                    <td>
                        {user.last_name}
                    </td>
                </tr>

                ))}
              
            </tbody>
        </table>
    )

}