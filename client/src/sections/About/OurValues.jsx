export default function OurValues() {
  return (
    <div className="px-8 lg:px-40 my-20">
      <h3 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center">Our Values</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div class="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all hover:border-pink-200">
          <div class="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center mb-4 text-pink-500">
            🔒
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Privacy First</h3>
          <p class="text-gray-600 mb-3">
            Your body data shouldn't be a commodity.
          </p>
          <ul class="space-y-1.5 text-sm text-gray-500">
            <li class="flex items-start">
              <span class="text-pink-400 mr-2 mt-0.5">✓</span> End-to-end
              encryption
            </li>
            <li class="flex items-start">
              <span class="text-pink-400 mr-2 mt-0.5">✓</span> No third-party
              sharing
            </li>
            <li class="flex items-start">
              <span class="text-pink-400 mr-2 mt-0.5">✓</span> Anonymous mode
            </li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all hover:border-purple-200">
          <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-500">
            🌍
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">
            Inclusive by Design
          </h3>
          <p class="text-gray-600 mb-3">
            Periods don't discriminate—neither do we.
          </p>
          <ul class="space-y-1.5 text-sm text-gray-500">
            <li class="flex items-start">
              <span class="text-purple-400 mr-2 mt-0.5">✓</span> Gender-neutral
              language
            </li>
            <li class="flex items-start">
              <span class="text-purple-400 mr-2 mt-0.5">✓</span> Customizable
              tracking
            </li>
            <li class="flex items-start">
              <span class="text-purple-400 mr-2 mt-0.5">✓</span>{" "}
              Accessibility-tested
            </li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all hover:border-blue-200">
          <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-500">
            🔬
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Science-Backed</h3>
          <p class="text-gray-600 mb-3">No guesswork, just evidence.</p>
          <ul class="space-y-1.5 text-sm text-gray-500">
            <li class="flex items-start">
              <span class="text-blue-400 mr-2 mt-0.5">✓</span> OB-GYN advisors
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2 mt-0.5">✓</span> Peer-reviewed
              algorithm
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2 mt-0.5">✓</span> Transparent
              metrics
            </li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all hover:border-amber-200">
          <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500">
            💌
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Human-Centered</h3>
          <p class="text-gray-600 mb-3">
            Built by people who bleed, for people who bleed.
          </p>
          <ul class="space-y-1.5 text-sm text-gray-500">
            <li class="flex items-start">
              <span class="text-amber-400 mr-2 mt-0.5">✓</span> Community-driven
            </li>
            <li class="flex items-start">
              <span class="text-amber-400 mr-2 mt-0.5">✓</span> Real-user
              testing
            </li>
            <li class="flex items-start">
              <span class="text-amber-400 mr-2 mt-0.5">✓</span> Judgment-free
              support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
