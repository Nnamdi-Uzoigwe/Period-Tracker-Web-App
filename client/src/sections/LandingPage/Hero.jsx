import Button from "../../components/Button";

export default function Hero() {
  return (
    <div className="px-8 lg:px-40 flex flex-col-reverse lg:flex-row justify-between items-center mt-10 lg:mt-20 py-20">
      <div className="text-gray-600">
        <h1 className="text-center lg:text-left font-semibold text-[25px] lg:text-[38px] mb-4 lg:mb-6 leading-8 lg:leading-14">
          Track your period, predict fertile days, and understand your cycle.
        </h1>
        <p className="text-center lg:text-left text-md mb-8 w-[100%] lg:w-[85%]">
          A simple, secure, and personalized web app designed to help you track
          your menstrual cycle, understand your body, and take charge of your
          mental and reproductive health
        </p>
        <div className="flex justify-center lg:justify-start">
            <Button>Get Started</Button>
        </div>
      </div>

      <img src="/woman2.png" alt="" className="w-[70%] lg:w-[50%] mt-10 lg:mt-0" />
    </div>
  );
}
