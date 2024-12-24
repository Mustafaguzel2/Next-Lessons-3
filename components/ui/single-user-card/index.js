'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/app/context";

function SingleUserCard({user}) {
    const {setOpenPopup, setAddNewUserFormData, setCurrentEditedID} = useContext(UserContext);
    function handleDeleteUser(getCurrentUserID) {
        const result = deleteUserAction(getCurrentUserID, "/user-managment");
        console.log(result);
    }

    function handleEditUser(getCurrentUser) {
        setOpenPopup(true);
        setAddNewUserFormData({
            firstName: getCurrentUser?.firstName,
            lastName: getCurrentUser?.lastName,
            email: getCurrentUser?.email,
            address: getCurrentUser?.address,
        })
        setCurrentEditedID(getCurrentUser?._id);
    }

    return (
        <div>
            <Card className="hover:-translate-y-3 ease-in-out duration-500">
                <CardHeader>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Address: {user.address}
                        <br/>
                        Email: {user.email}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => {handleEditUser(user)}} className="w-28">Edit</Button>
                    <Button onClick={() => {handleDeleteUser(user?._id)}} className="w-28">Delete</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default SingleUserCard;