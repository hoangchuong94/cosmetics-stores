import React from 'react';

export default function Search() {
    return (
        <form action="">
            <div className="relative flex h-12 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-purple-100 to-pink-100 shadow-md">
                <input
                    placeholder="Search.."
                    id="input"
                    name="text"
                    type="text"
                    className="h-10 w-48 rounded-full border-none bg-white pl-4 text-sm tracking-wide text-black caret-orange-500 outline-none"
                />
            </div>
        </form>
    );
}
