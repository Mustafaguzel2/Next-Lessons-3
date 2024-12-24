'use client';
import { addNewUserAction, editUserAction } from "@/actions";
import { UserContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewUserFormControls, addNewUserFormInitialState } from "@/utils";
import { useContext } from "react";



function AddNewUser() {
    const { openPopup, setOpenPopup, addNewUserFormData, setAddNewUserFormData, currentEditedID ,setCurrentEditedID} = useContext(UserContext);
    console.log(addNewUserFormData);
    function handleSaveButtonValid(){
        return Object
        .keys(addNewUserFormData) 
        .every((key) => {
            const value = addNewUserFormData[key];
            return typeof value === "string" && value.trim() !== "";
        })
    }

     function handleAddNewUserAction() {
        const result = currentEditedID !== null ? 
        editUserAction(currentEditedID, addNewUserFormData, "/user-managment") :
        addNewUserAction(addNewUserFormData, "/user-managment");
        console.log(result);
        setOpenPopup(false);
        setAddNewUserFormData(addNewUserFormInitialState);
        setCurrentEditedID(null);
    }

    return (
        <div>
            <Button onClick={() => setOpenPopup(true)}>Add New User</Button>

            <Dialog open={openPopup} 
            onOpenChange={() => {
                setOpenPopup(false);
                setAddNewUserFormData(addNewUserFormInitialState);
                setCurrentEditedID(null);
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><Label>
                            {
                                currentEditedID ? "Edit User" : "Add New User"
                            }    
                        </Label></DialogTitle>
                    </DialogHeader>
                    <form action={handleAddNewUserAction} className="grid grid-cols-1 gap-4 py-4">
                        {
                            addNewUserFormControls.map((control) => {
                                return <div key={control.name}>
                                    <Label>{control.label}</Label>
                                    <Input 
                                        name={control.name} 
                                        id={control.id} 
                                        placeholder={control.placeholder} 
                                        type={control.type}
                                        value={addNewUserFormData[control.name]}
                                        onChange={(e) => setAddNewUserFormData({ ...addNewUserFormData, [control.name]: e.target.value })}
                                        /> 
                                </div>      
                            })
                        }
                        <footer>
                        <Button className="disabled:opacity-70 w-full" 
                            disabled={!handleSaveButtonValid()} 
                            type="submit">Save</Button>
                        </footer>
                    </form>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewUser;