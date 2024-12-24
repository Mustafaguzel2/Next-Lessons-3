import AddNewUser from "@/components/ui/add-new-user";
import { fetchUsersAction } from '@/actions';
import SingleUserCard from "@/components/ui/single-user-card";

async function UserManagment() {
    const getListOfUsers = await fetchUsersAction();

    console.log(getListOfUsers);
    
    return <div className="p-20 max-w-6xl">
        <div className="flex justify-between">
            <h1>User Managment</h1>
            <AddNewUser />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 sm:grid-cols-1 mt-5">
            {
                getListOfUsers && getListOfUsers.data && getListOfUsers.data.length > 0 ?
                getListOfUsers.data.map((user) => {
                    return <SingleUserCard key={user.id} user={user} />
                }) : <p>No users found</p>
            }
        </div>
    </div>
}

export default UserManagment;
