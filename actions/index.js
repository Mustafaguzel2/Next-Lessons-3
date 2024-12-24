'use server';
import connectToDB from "@/app/database";
import User from "@/app/models/user";
import { revalidatePath } from "next/cache";
export async function addNewUserAction(formData, pathToRevalidate) {
    await connectToDB();
    try{

        const newlyCreatedUser = await User.create(formData);
        if(newlyCreatedUser) {
            revalidatePath(pathToRevalidate);
            return{
                success: true, 
                message: 'User created successfully',
            }
        }else{
            return{
                success: false, 
                message: 'Some error occured! Please try again'
            }
        }

    }catch(error){
        console.log(error);
        return{
            success: false, 
            message: 'Some error occured! Please try again'
        }
    }
}

export async function fetchUsersAction() {
    await connectToDB();
    try{
        const listOfUsers = await User.find({});

        if(listOfUsers) {
            return{
                success: true, 
                data: JSON.parse(JSON.stringify(listOfUsers))
            }
        }else{
            return{
                success: false, 
                message: 'Some error occured! Please try again'
            }
        };
    
    }catch(error){
        console.log(error);
        return{
            success: false, 
            message: 'Some error occured! Please try again'
        }
    }
    
}

export async function deleteUserAction(currentUserID, pathToRevalidate) {
    await connectToDB();
    try{
        const deletedUser = await User.findByIdAndDelete(currentUserID);

        if(deletedUser) {
            revalidatePath(pathToRevalidate);
            return{
                success: true, 
                message: 'User deleted successfully',
            }
        }else{
            return{
                success: false, 
                message: 'Some error occured! Please try again'
            }
        }

    }catch(error){
        console.log(error);
        return{
            success: false, 
            message: 'Some error occured! Please try again'
        }
    }
}

export async function editUserAction(currentUserID, formData, pathToRevalidate) {
    await connectToDB();
    const {firstName, lastName, email, address} = formData;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            {_id: currentUserID},
            {firstName, lastName, email, address}, 
            {new: true}
        )         

        if(updatedUser) {
            revalidatePath(pathToRevalidate);
            return{
                success: true, 
                message: 'User updated successfully',
            }
        }else{
            return{
                success: false, 
                message: 'Some error occured! Please try again'
            }
        }

    }catch(error){
        console.log(error);
        return{
            success: false, 
            message: 'Some error occured! Please try again'
        }       
    }

}