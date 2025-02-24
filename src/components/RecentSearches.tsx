import React from 'react';

interface RecentSearchesProps {
    recentSearches: string[];
    onClick: (id: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches, onClick }) => {
    return (
        <div className='mt-2'>
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 bg-blue-50">
                Recent Searches
            </h3>

            <ul>
                {recentSearches.map((id) => (
                    <li key={id} onClick={() => onClick(id)} className="cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-500">
                        {id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSearches;
