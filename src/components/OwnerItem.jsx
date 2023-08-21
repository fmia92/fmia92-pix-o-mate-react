export function OwnerItem({ owner, isFavourite, onOwnerClick }) {
  return (
    <div
      className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:border-gray-60 ${
        isFavourite ? 'bg-[#1b263b] text-white' : 'bg-white'
      }`}
      onClick={() => onOwnerClick(owner)}
    >
      <p className=" break-words text-lg font-semibold">{owner.name}</p>
      <p className=" break-words italic">{owner.email}</p>
      <p>
        {owner.gender}
      </p>
      {
        owner.status === 'active'
          ? <span class="text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-[#06d6a0]">Active</span>
          : <span class="text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-[#ef476f]">Inactive</span>
      }
    </div>
  )
}