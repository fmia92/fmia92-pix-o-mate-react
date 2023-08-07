
export function OwnerItem({ owner, isFavourite, onOwnerClick }) {
  return (
    <div
      className={`p-2 mb-2 rounded cursor-pointer border-t-2 ${
        isFavourite ? 'bg-blue-200' : 'bg-white'
      }`}
      onClick={() => onOwnerClick(owner)}
    >
      <p className=" break-words text-lg font-semibold">{owner.name}</p>
      <p className=" break-words italic">{owner.email}</p>
      <p>
        {owner.gender}
      </p>
      <p className={` break-words font-medium ${owner.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
        {owner.status}
      </p>
    </div>
  );
}