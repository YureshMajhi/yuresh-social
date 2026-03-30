const Photos = () => {
  return (
    <>
      <div className="lg:col-span-4 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/60 h-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-medium text-gray-900">Photos</h3>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            See All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1509803874385-db7c23652552?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1509803874385-db7c23652552?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Photo"
            className="w-full aspect-square rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          />
        </div>
      </div>
    </>
  );
};

export default Photos;
