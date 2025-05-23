export default function CycleInfoModal({ closeModal }) {
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black opacity-70"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div className="relative z-50 flex items-center justify-center min-h-screen">
        <div
          className="bg-white h-[350px] lg:h-auto overflow-y-scroll lg:overflow-y-hidden rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-purple-800">
              Menstrual Cycle Information
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 font-semibold cursor-pointer text-3xl"
            >
              &times;
            </button>
          </div>
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h3 className="font-semibold text-purple-800 mb-2">Cycle Length</h3>
            <p className="text-gray-600 text-sm mb-2">
              The number of days from the first day of your period to the day
              before your next period starts.
            </p>
            <div className="italic bg-gray-50 p-3 text-sm rounded text-gray-600">
              Example: If your period started on June 1 and your next period
              began on June 29, your cycle length would be 28 days.
            </div>
          </div>
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h3 className="font-semibold text-purple-800 mb-2">Period Length</h3>
            <p className="text-gray-600 text-sm mb-2">
              The number of days your menstrual bleeding lasts during one cycle.
            </p>
            <div className="italic bg-gray-50 text-sm p-3 rounded text-gray-600">
              Example: If you bleed from June 1 to June 5, your period length
              would be 5 days.
            </div>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold text-purple-800 mb-2">Flow Intensity</h3>
            <p className="text-gray-600 text-sm mb-2">
              How heavy or light your menstrual bleeding is, often described as
              light, medium, or heavy.
            </p>
            <div className="italic text-sm bg-gray-50 p-3 rounded text-gray-600">
              Example: Changing a regular pad/tampon every 4-6 hours would
              typically be considered medium flow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
