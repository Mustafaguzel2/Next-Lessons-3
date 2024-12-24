'use client';


import UserState from "@/app/context";

export default function CommonLayout({ children }) {
    return (
        <UserState>
            {children}
        </UserState>
    );
}