import { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "How accurate are Celestia's predictions?",
      answer:
        "Our algorithm achieves 90% accuracy after 3 logged cycles by combining your inputs with peer-reviewed medical patterns. Always consult a healthcare provider for medical decisions.",
    },
    {
      id: 2,
      question: "Is my data really private?",
      answer:
        "Absolutely. We use end-to-end encryption and never sell/share your data. You can also use anonymous mode without email registration.",
    },
    {
      id: 3,
      question: "Can I track symptoms beyond periods?",
      answer:
        "Yes! Log 20+ symptoms like cramps, mood swings, and sleep patterns. Custom tags are also available.",
    },
    {
      id: 4,
      question: "How does Celestia differ from other apps?",
      answer:
        "Three key ways: 1) No ads or data mining, 2) Medical-advisor-reviewed algorithms, 3) Inclusive design for all genders and cycle types.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h3 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center">Frequently Asked Questions</h3>
     
    
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border  border-gray-200 rounded-xl overflow-hidden hover:border-purple-200 transition-colors"
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="cursor-pointer w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <h3 className="text-lg font-medium text-gray-800">
                {faq.question}
              </h3>
              <svg
                className={`w-5 h-5 text-purple-500 transform transition-transform ${
                  openFaq === faq.id ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === faq.id && (
              <div className="px-6 pb-6 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
