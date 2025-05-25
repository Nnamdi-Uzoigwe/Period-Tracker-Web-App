export default function OurStory() {
  return (
    <div className="px-8 lg:px-40 py-10">
      <h2 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center">
        Our Story
      </h2>
    
      <div className="max-w-3xl mx-auto px-6 py-8 bg-white/90 rounded-xl shadow-sm border border-pink-100">
        <p className="text-gray-700 text-lg leading-relaxed tracking-normal">
          <span className="block text-2xl font-serif text-purple-800 italic mb-4">
            Celestia began in 2025 as a{" "}
            <span className="font-bold underline decoration-purple-300">
              final-year computer science project
            </span>
            —one that grew from late-night coding sessions into a mission to
            revolutionize period care.
          </span>
          Our founder, <span className="font-semibold text-gray-800">Chinenye Edwin</span>,
          was tired of juggling clunky period trackers while surviving
          university life. Between exams and erratic cycles, existing apps felt{" "}
          <span className="bg-purple-100 px-1 rounded">
            invasive, ad-ridden, or just plain inaccurate
          </span>
          . So when their professor challenged the class to{" "}
          <span className="italic text-gray-600">
            "build something that solves a real problem,"
          </span>{" "}
          Chinenye knew exactly what to create:{" "}
          <span className="font-medium text-purple-600">
            a privacy-first period tracker
          </span>{" "}
          that actually worked.
          <span className="my-4 block border-l-4 border-purple-300 pl-4 text-gray-600">
            What started as a dorm-room prototype caught fire. With feedback
            from classmates (and a lot of beta-testing pizza), Chinenye teamed up
            with <span className="font-semibold">Dr. Maya Chen</span>, a campus
            health advisor, to refine the algorithm.
          </span>
          Today, what began as an undergrad project helps{" "}
          <span className="text-purple-800 font-bold">1,000+ users</span> track
          their cycles without ads, data mining, or guesswork. We're proof that
          student ideas can grow—
          <span className="italic">one period prediction at a time.</span>
        </p>
      </div>
    </div>
  );
}
