export default function Testimonials() {
  return (
    <div>
      <section className="bg-gray-50 py-12 px-4">
        <h3 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center">What our users say</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="col-span-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "This app has made tracking my cycle effortless. The predictions
              are spot on!"
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Amina B.</h4>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "I love how private and easy to use the dashboard is. It's now
              part of my daily routine."
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Chioma E.</h4>
          </div>

          <div className="col-span-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "Thanks to this app, I finally understand my cycle better than
              ever before."
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Kemi O.</h4>
          </div>

          <div className="col-span-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "Clean interface and reliable reminders — just what I needed!"
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Nkechi A.</h4>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "Even with my irregular cycle, the app helps me stay prepared and
              less anxious."
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Fatima U.</h4>
          </div>

          <div className="col-span-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              "It's reassuring to have a tool that understands my body. Highly
              recommend!"
            </p>
            <h4 className="mt-4 font-semibold text-purple-600">— Zainab M.</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
